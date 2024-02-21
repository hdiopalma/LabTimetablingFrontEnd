// common store function for web, like component state, etc.

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        sidebarDropdownActive: false,
        switchValue: false,
    }),
    actions: {
        toggleSidebarDropdown(value) {
            this.sidebarDropdownActive = value
        },
        toggleSwitchValue(value) {
            this.switchValue = value
        },
    },
})