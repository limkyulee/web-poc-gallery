import { type UserModule } from '@/types'
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'

// https://indoorequal.github.io/vue-maplibre-gl/guide/getting-started.html
export const install: UserModule = ({ app }) => {
  app.use(VueMaplibreGl)
}