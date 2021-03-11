<template>
    <Modal
        v-model="DialogVisible"
        :title="DialogTitle"
        @on-ok="DialogVisible=false"
        @on-cancel="DialogVisible=false">
        {{DialogMessage}}
    </Modal>
</template>

<script>
export default {
    name: "dialog",
    created() {
        const _this = this
        this.$eventBus.$off("OpenMessageDialog")
        this.$eventBus.$on("OpenMessageDialog", (showTitle, showMessage)=> {
            _this.DialogTitle = showTitle
            _this.DialogMessage = showMessage
            _this.DialogVisible = true
        })
    },
    data () {
        return {
            DialogTitle: "",
            DialogMessage: "",
            DialogVisible: false
        }
    }
}
</script>

<style scoped>

</style>