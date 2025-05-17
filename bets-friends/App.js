import 'react-native-gesture-handler';
 
import * as React from 'react';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View,SafeAreaView , Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

/*
cor 01: #F3F4F0 (tela principal)
cor 02: #8A919B (marcadores/seletores)
cor 03: #F0FF69 (botão area escura)
cor 04: #776C5B (botão) area clara)
cor 05: #27262D (apoio/contraste)
*/