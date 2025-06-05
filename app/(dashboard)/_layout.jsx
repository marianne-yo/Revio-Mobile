import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 80 },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen 
        name="Library"
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'folder-open': 'folder-outline'} 
            color={focused ? theme.iconColorFocused : theme.iconColor} 
          />
        )}}
      />
      <Tabs.Screen 
        name="Focus"
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'musical-notes': 'musical-notes-outline'} 
            color={focused ? theme.iconColorFocused : theme.iconColor} 
          />
        )}} 
      />
      <Tabs.Screen 
        name="StudyTools"
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'add-circle': 'add-circle-outline'} 
            color={focused ? theme.iconColorFocused : theme.iconColor} 
          />
        )}} 
      />
      <Tabs.Screen 
        name="Settings"
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'settings': 'settings-outline'} 
            color={focused ? theme.iconColorFocused : theme.iconColor} 
          />
        )}} 
      />
    </Tabs>
  )
}