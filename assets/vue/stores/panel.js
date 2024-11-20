import { defineStore } from 'pinia';

export const panelStore = defineStore('panelStore', {
  state: () => {
    return {
      content: {
        data: '',
        title: '',
        container: null
      },
      flags: {
        isOpen: false,
        isContentLoaded: false
      }
    }
  },
  actions: {
    openPanel: function (content) {
      const self = this;

      self.$patch({
        content: {
          data: content
        },
        flags: {
          isOpen: true
        }
      })

      self.setPanelContent();
    },
    closePanel: function () {
      const self = this;
      const container = self.content.container;
      const data = self.content.data;

      data.unmount(container)

      self.$patch({
        content: {
          data: ''
        },
        flags: {
          isOpen: false,
          isContentLoaded: false
        }
      })
    },
    setPanelContent: function () {
      const self = this;
      const container = self.content.container;
      const data = self.content.data;

      data.mount(container)

      setTimeout(() => {
        self.$patch({
          flags: {
            isContentLoaded: true
          }
        })
      }, 1000)
    },
    setContentContainerRef: function (ref) {
      const self = this;

      self.$patch({
        content: {
          container: ref
        }
      })
    },
    setPanelTitle: function (title) {
      const self = this;
      
      self.$patch({
        content: {
          title: title
        }
      })
    }
  }
});