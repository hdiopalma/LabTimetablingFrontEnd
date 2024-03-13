import { defineStore } from 'pinia';
import { AppConfig } from '@/services/appConfig';

// get globalProperties from app, 
const apiPath = 'data/semester/';
const token = localStorage.getItem(AppConfig.tokenKey) || null;
const header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
    },
};

// $apiURL is a globalProperties from app that stored on pinia, defined in main.js
export const useSemesterStore = defineStore('semester', {
    state: () => ({
        items: [],
    }),
    actions: {

        setItems(items) {
            this.items = items;
        },

        async fetchSemesters(page = 1, page_size = 10) {
            try {
                const response = await this.$apiURL.get(apiPath, { params: { page, page_size } });
                this.setItems(response.data);
                console.log('fetchSemesters', response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addSemester(lab) {
            try {
                const response = await this.$apiURL.post(apiPath, lab, header);
                this.items.push(response.data);
                return response;
            } catch (error) {
                console.error('Error adding lab:', error);
                return error;
            }
        },
        async updateSemester(lab) {
            try {
                const response = await this.$apiURL.put(`${apiPath}/${lab.id}`, lab);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
            } catch (error) {
                console.error('Error updating lab:', error);
            }
        },
        async deleteSemester(id) {
            try {
                const response = await this.$apiURL.delete(`${apiPath}${id}`, header);
                this.items = this.items.filter((lab) => lab.id !== id);
                return response;
                // console.log('deleteSemester', id);
            } catch (error) {
                console.error('Error deleting lab:', error);
                return error;
            }
        },
        async fetchSemester(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
            }
        },
    },
});


