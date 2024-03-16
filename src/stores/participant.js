import { defineStore } from 'pinia';
import axios from 'axios';

const apiPath = 'data/participant';

export const useParticipantStore = defineStore('participant', {
    state: () => ({
        items: [],
        itemsCount: 0,
    }),
    actions: {

        setItems(items) {
            this.items = items;
        },
        setCount(count) {
            this.itemsCount = count;
        },

        async fetchParticipants(page = 1, page_size = 10) {
            try {
                const response = await this.$apiURL.get(apiPath, { params: { page, page_size } });
                this.setItems(response.data.results);
                this.setCount(response.data.count);               
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addParticipant(lab) {
            try {
                const response = await this.$apiURL.post(apiPath, lab);
                this.items.push(response.data);
                this.setCount(this.count + 1);
            } catch (error) {
                console.error('Error adding lab:', error);
            }
        },
        async updateParticipant(lab) {
            try {
                const response = await this.$apiURL.put(`${apiPath}/${lab.id}`, lab);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
            } catch (error) {
                console.error('Error updating lab:', error);
            }
        },
        async deleteParticipant(id) {
            try {
                await this.$apiURL.delete(`${apiPath}/${id}`);
                this.items = this.items.filter((lab) => lab.id !== id);
                this.setCount(this.count - 1);
            } catch (error) {
                console.error('Error deleting lab:', error);
            }
        },
        async fetchParticipant(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
            }
        },
    },
});


