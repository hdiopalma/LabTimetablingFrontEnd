import { defineStore } from 'pinia';
import axios from 'axios';

const apiPath = 'data/chapter';

export const useChapterStore = defineStore('chapter', {
    state: () => ({
        items: [],
    }),
    actions: {

        setItems(items) {
            this.items = items;
        },

        async fetchItems() {
            try {
                const response = await this.$apiURL.get(apiPath);
                this.setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addItem(lab) {
            try {
                const response = await this.$apiURL.post(apiPath, lab);
                this.items.push(response.data);
            } catch (error) {
                console.error('Error adding lab:', error);
            }
        },
        async updateItem(lab) {
            try {
                const response = await this.$apiURL.put(`${apiPath}/${lab.id}`, lab);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
            } catch (error) {
                console.error('Error updating lab:', error);
            }
        },
        async deleteItem(id) {
            try {
                await this.$apiURL.delete(`${apiPath}/${id}`);
                this.items = this.items.filter((lab) => lab.id !== id);
            } catch (error) {
                console.error('Error deleting lab:', error);
            }
        },
        async fetchItem(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
            }
        },
    },
});


