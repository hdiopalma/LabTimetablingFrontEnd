import { defineStore } from 'pinia';
import axios from 'axios';

import { AppConfig } from '@/services/appConfig';

const apiPath = 'data/laboratory';
const token = localStorage.getItem(AppConfig.tokenKey) || null;
const header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
    },
};

export const useLabStore = defineStore('lab', {
    state: () => ({
        items: [],
        itemsName: [],
        itemsCount: 0,
    }),
    
    actions: {
        setItems(items) {
            this.items = items;
            this.itemsName = items.reduce((acc, item) => {
                acc[item.id] = item.name;
                return acc;
            }, {});
        },

        setCount(count) {
            this.itemsCount = count;
            localStorage.setItem('labCount', count);
        },

        async fetchItems(page = 1, page_size = 10) {
            try {
                const response = await this.$apiURL.get(apiPath, { params: { page, page_size } });
                this.setItems(response.data.results);
                this.setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async addItem(lab) {
            try {
                const response = await this.$apiURL.post(`${apiPath}/`, lab, header);
                this.items.push(response.data);
                return response;
            } catch (error) {
                console.error('Error adding lab:', error);
                return error.response;
            }
        },
        async updateItem(lab) {
            try {
                const response = await this.$apiURL.put(`${apiPath}/${lab.id}/`, lab, header);
                const index = this.items.findIndex((l) => l.id === lab.id);
                this.items[index] = response.data;
                return response;
            } catch (error) {
                console.error('Error updating lab:', error);
                return error.response;
            }
        },
        async deleteItem(id) {
            try {
                const response = await this.$apiURL.delete(`${apiPath}/${id}`, header);
                this.items = this.items.filter((lab) => lab.id !== id);
                return response;
            } catch (error) {
                console.error('Error deleting lab:', error);
                return error.response;
            }
        },
        async fetchItem(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching lab:', error);
                return error.response;
            }
        },
        async countItem(id, child = 'all') {
            try {
                const response = await this.$apiURL.get(`${apiPath}/${id}/count/${child}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching count:', error);
                return error.response;
            }
        },

        getLabName(id) {
            const lab = this.items.find((l) => l.id === id);
            return lab ? lab.name : '';
        },
    },
});


