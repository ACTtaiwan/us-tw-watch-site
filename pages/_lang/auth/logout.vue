<template>
  <p>Logging out ...</p>
</template>

<script>
import { unsetToken } from '@/plugins/auth'
import { logout } from '@/plugins/lock'

export default {
  mounted () {
    unsetToken()
    logout()
  }
}
</script>
