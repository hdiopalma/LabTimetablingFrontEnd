import { defineStore } from 'pinia';
import { AppConfig } from '@/services/appConfig';

const apiPath = 'data/chapter/';
const token = localStorage.getItem(AppConfig.tokenKey) || null;
const header = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
    },
};

export const useChapterStore = defineStore('chapter', {
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
            localStorage.setItem('chapterCount', count);
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
        async addItem(chapter) {
            try {
                const response = await this.$apiURL.post(apiPath, chapter, header);
                this.items.push(response.data);
                return response;
            } catch (error) {
                console.error('Error adding chapter:', error);
                return error.response;
            }
        },
        async updateItem(chapter) {
            try {
                const response = await this.$apiURL.put(`${apiPath}${chapter.id}/`, chapter, header);
                const index = this.items.findIndex((l) => l.id === chapter.id);
                this.items[index] = response.data;
                return response;
            } catch (error) {
                console.error('Error updating chapter:', error);
                return error.response;
            }
        },
        async deleteItem(id) {
            try {
                const response = await this.$apiURL.delete(`${apiPath}${id}/`, header);
                this.items = this.items.filter((chapter) => chapter.id !== id);
                return response;
            } catch (error) {
                console.error('Error deleting chapter:', error);
                return error.response;
            }
        },
        async fetchItem(id) {
            try {
                const response = await this.$apiURL.get(`${apiPath}${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching chapter:', error);
            }
        },
    },
});


