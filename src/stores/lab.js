import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/data/lab';

export const useLabStore = defineStore('lab', {
    state: () => ({
        items: [],
    }),
    actions: {

        setItems(items) {
            this.items = items;
        },

        async fetchLabs() {
            try {
                const response = await axios.get(apiUrl);
                this.setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addLab(lab) {
            try {
                const response = await axios.post(apiUrl, lab);
                this.items.push(response.data);
            } catch (error) {
                console.error('Error adding lab:', error);
            }
        },
        async updateLab(lab) {
            try {
                const response = await axios.put(`${apiUrl}/${lab.id}`, lab);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
            } catch (error) {
                console.error('Error updating lab:', error);
            }
        },
        async deleteLab(id) {
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.items = this.items.filter((lab) => lab.id !== id);
            } catch (error) {
                console.error('Error deleting lab:', error);
            }
        },
        async fetchLab(id) {
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
            }
        },
    },
});

export default useLabStore();
