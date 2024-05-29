import { defineStore } from 'pinia';
import { AppConfig } from '@/services/appConfig';

// get globalProperties from app, 
const apiPath = 'data/solution/';
const token = localStorage.getItem(AppConfig.tokenKey) || null;
const header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
    },
};

export const useSolutionStore = defineStore('solution', {
    state: () => ({
        items: [],
        itemsCount: 0,
        activeSolution: null,
    }),
    actions: {
        setItems(items) {
            this.items = items;
        },
        setActiveSolution(solution) {
            this.activeSolution = solution;
            //save active solution id to local storage
            if (solution) {
                localStorage.setItem('activeSolution', solution.id);
            } else {
                localStorage.removeItem('activeSolution');
            }
        },
        setCount(count) {
            this.itemsCount = count;
            localStorage.setItem('solutionCount', count);
        },
        setAllStatus(status) {
            this.items.forEach((item) => {
                if (item.status !== status) {
                    item.status = status;
                }
            });
        },

        async fetchItems(page = 1, page_size = 10, search = '', statusFilter = null) {
            console.log('fetchItems');
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
        async fetchItem(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}${id}/`);
                // this.setActiveSolution(response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching item:', error);
                return error;
            }
        },
        async deleteItem(id) {
            try {
                const response = await this.$apiURL.delete(`${apiPath}${id}/`, header);
                this.fetchItems();
                return response;
            } catch (error) {
                console.error('Error deleting item:', error);
                return error;
            }
        },
    },
});