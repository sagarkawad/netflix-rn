import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {

  return (
    <Stack>
    <Stack.Screen name="[id]" options={{ headerShown: true, headerTitle: "Movies" } } />
  </Stack>
  );
}
