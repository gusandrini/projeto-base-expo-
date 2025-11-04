import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import { useSession } from '@/services/SessionProvider';
import { useTheme } from '@/context/ThemeContext';
import { scheduleLoginNotification } from '@/Notificacao';
import { useI18n } from '@/i18n/I18nProvider';

import { styles } from '@/styles/screens/Login';

export default function Login({ navigation }: any) {
  const { login } = useSession();
  const { theme, isDark, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('login.alerts.warningTitle'), t('login.alerts.fillFields'));
      return;
    }

    try {
      setLoading(true);
      const ok = await login(email, password);

      if (!ok) {
        Alert.alert(t('login.alerts.invalidTitle'), t('login.alerts.invalidMessage'));
        return;
      }

      scheduleLoginNotification();
      navigation.replace('Home');
    } catch (err: any) {
      console.error('Erro no login:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          Alert.alert(t('login.alerts.invalidTitle'), t('login.alerts.invalidMessage'));
        } else if (err.response?.status === 500) {
          Alert.alert(t('login.alerts.serverErrorTitle'), t('login.alerts.serverErrorMessage'));
        } else {
          Alert.alert(t('login.alerts.errorTitle'), t('login.alerts.connectionError'));
        }
      } else {
        Alert.alert(t('login.alerts.errorTitle'), t('login.alerts.unexpectedError'));
      }
    } finally {
      setLoading(false);
    }
  }

  function toggleLanguage() {
    const nextLocale = locale === 'pt-BR' ? 'es-ES' : 'pt-BR';
    setLocale(nextLocale);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{t('login.title')}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>{t('login.subtitle')}</Text>

        <View
          style={[
            styles.inputContainer,
            { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
          ]}
        >
          <Ionicons name="mail-outline" size={20} color={theme.colors.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder={t('login.placeholders.email')}
            placeholderTextColor={theme.colors.mutedText}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color={theme.colors.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder={t('login.placeholders.password')}
            placeholderTextColor={theme.colors.mutedText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Ionicons name="log-in-outline" size={22} color={theme.colors.primaryText} />
          <Text style={[styles.buttonText, { color: theme.colors.primaryText }]}>
            {t('login.actions.enter')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          // Ajuste o nome da rota conforme seu Tab/Stack. Se a tela estiver registrada como "Cadastro", use "Cadastro".
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={[styles.registerText, { color: theme.colors.primary }]}>
            {t('login.actions.register')}
          </Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          {/* Botão de tema */}
          <TouchableOpacity style={[styles.switchBtn, { backgroundColor: theme.colors.surface }]} onPress={toggleTheme} activeOpacity={0.7}>
            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color={theme.colors.text} />
            <Text style={[styles.switchText, { color: theme.colors.text }]}>
              {isDark ? t('home.theme.lightMode') : t('home.theme.darkMode')}
            </Text>
          </TouchableOpacity>

          {/* Botão de idioma */}
          <TouchableOpacity style={[styles.switchBtn, { backgroundColor: theme.colors.surface }]} onPress={toggleLanguage} activeOpacity={0.7}>
            <Ionicons name="language-outline" size={18} color={theme.colors.text} />
            <Text style={[styles.switchText, { color: theme.colors.text }]}>
              {locale === 'pt-BR'
                ? t('home.language.portugueseShort')
                : t('home.language.spanishShort')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: '#fff' }]}>{t('login.loading')}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
