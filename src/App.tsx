
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import Todos from './Todos'

// Create a client
const queryClient = new QueryClient()

const App = () => {
  return (
    // Provide the client to your App
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </View>
  )
}

export default App
