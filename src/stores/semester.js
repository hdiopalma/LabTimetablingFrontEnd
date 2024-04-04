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
        itemsCount: 0,
        activeSemester: null,
    }),
    actions: {
        setItems(items) {
            this.items = items;
        },
        setActiveSemester(semester) {
            this.activeSemester = semester;
            //save active semester id to local storage
            if (semester) {
                localStorage.setItem('activeSemester', semester.id);
            } else {
                localStorage.removeItem('activeSemester');
            }
        },
        setCount(count) {
            this.itemsCount = count;
            localStorage.setItem('semesterCount', count);
        },
        setAllStatus(status) {
            this.items.forEach((item) => {
                if (item.status !== status) {
                    item.status = status;
                }
            });
        },

        async fetchItems(page = 1, page_size = 10, search = '', statusFilter = null) {
            try {
                const response = await this.$apiURL.get(apiPath, { 
                    params: { 
                        page,
                        page_size,
                        search,
                        status: statusFilter 
                    } });
                this.setItems(response.data.results);
                this.setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching items:', error);
                return error;
            }
        },
        async addItem(semester) {
            try {
                const response = await this.$apiURL.post(apiPath, semester, header);
                this.items.push(response.data);
                await this.fetchActiveSemester('all');
                return response;
            } catch (error) {
                console.error('Error adding semester:', error);
                return error.response;
            }
        },
        async updateItem(semester) {
            try {
                const response = await this.$apiURL.put(`${apiPath}${semester.id}/`, semester, header);
                const index = this.items.findIndex((l) => l.id === semester.id);
                if (semester.status === true) {
                    this.setAllStatus(false);
                }
                this.items[index] = response.data;
                await this.fetchActiveSemester('all');
                return response;
            } catch (error) {
                console.error('Error updating semester:', error);
                return error.response;
            }
        },
        async deleteItem(id) {
            try {
                const response = await this.$apiURL.delete(`${apiPath}${id}`, header);
                this.items = this.items.filter((semester) => semester.id !== id);
                await this.fetchActiveSemester('all');
                return response;
            } catch (error) {
                console.error('Error deleting semester:', error.response);
                return error.response;
            }
        },
        async fetchItem(id, include_count = '') {
            try {
                const response = await this.$apiURL.get(`${apiPath}${id}`, { params: { include_count } });
                return response.data;
            } catch (error) {
                console.error('Error fetching semester:', error);
                return error.response;
            }
        },
        //count
        async countItem(id, child = 'all') {
            try {
                const response = await this.$apiURL.get(`${apiPath}${id}/count/${child}`);
                return response.data;
            } catch (error) {
                console.error('Error counting semester:', error);
                return error.response;
            }
        },

        // add other actions here
        async fetchActiveSemester(include_count = '') {
            try {
                const response = await this.$apiURL.get(`${apiPath}active/`, { params: { include_count } });
                this.setActiveSemester(response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching active semester:', error);
                this.setActiveSemester(null);
                return error.response;
            }
        },
    },
});


