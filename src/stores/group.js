import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/data/group';

export const useGroupStore = defineStore('group', {
    state: () => ({
        items: [],
    }),
    actions: {

        setItems(items) {
            this.items = items;
        },

        async fetchGroups() {
            try {
                const response = await axios.get(apiUrl);
                this.setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addGroup(lab) {
            try {
                const response = await axios.post(apiUrl, lab);
                this.items.push(response.data);
            } catch (error) {
                console.error('Error adding lab:', error);
            }
        },
        async updateGroup(lab) {
            try {
                const response = await axios.put(`${apiUrl}/${lab.id}`, lab);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
            } catch (error) {
                console.error('Error updating lab:', error);
            }
        },
        async deleteGroup(id) {
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.items = this.items.filter((lab) => lab.id !== id);
            } catch (error) {
                console.error('Error deleting lab:', error);
            }
        },
        async fetchGroup(id) {
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
            }
        },
    },
});


