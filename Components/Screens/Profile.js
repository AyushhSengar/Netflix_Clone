import { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    PixelRatio,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Svg, { Circle, Path } from 'react-native-svg';
import { auth, db } from '../../config/firebaseConfig';


const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const scaleW = (s) => (SCREEN_W / BASE_WIDTH) * s;
const scaleH = (s) => (SCREEN_H / BASE_HEIGHT) * s;
const scaleFont = (s) =>
  Math.round(PixelRatio.roundToNearestPixel(Math.min((SCREEN_W / BASE_WIDTH) * s, s * 1.4)));
const ANDROID_SB = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const ChevronRight = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke="#666" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EditIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AccountIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke="#ccc" strokeWidth={1.8} />
    <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const SignOutIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17l5-5-5-5M21 12H9" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const NotificationIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21a2 2 0 01-3.46 0" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PrivacyIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HelpIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth={1.8} />
    <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="#ccc" strokeWidth={1.8} strokeLinecap="round" />
    <Circle cx="12" cy="17" r="0.8" fill="#ccc" />
  </Svg>
);

const AVATAR_COLORS = ['#E50914', '#831010', '#0071EB', '#E87C03', '#54B9C5'];

const UserAvatar = ({ name, size = 80 }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const colorIndex = name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0;
  const bg = AVATAR_COLORS[colorIndex];

  return (
    <View style={{
      width: size, height: size, borderRadius: 6,
      backgroundColor: bg,
      justifyContent: 'center', alignItems: 'center',
    }}>
      <Text style={{
        color: '#fff',
        fontSize: size * 0.45,
        fontWeight: '700',
        letterSpacing: 1,
      }}>{initial}</Text>
    </View>
  );
};


const RowItem = ({ icon, label, subtitle, onPress, danger = false }) => (
  <TouchableOpacity style={styles.rowItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.rowLeft}>
      <View style={styles.rowIcon}>{icon}</View>
      <View>
        <Text style={[styles.rowLabel, danger && { color: '#E50914' }]}>{label}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
    <ChevronRight />
  </TouchableOpacity>
);


const Section = ({ title, children }) => (
  <View style={styles.section}>
    {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

export default function Profile() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const email = user?.email || '';

  const [signingOut, setSigningOut] = useState(false);
  const [profileIMG, setProfileIMG] = useState(null);
  const [imgError,   setImgError]   = useState(false);
  const [userName,   setUserName]   = useState(
    user?.displayName || user?.email?.split('@')[0] || 'User'
  );

  useEffect(() => {
    if (!user?.uid) return;
    const fetchUserDoc = async () => {
      try {
        const docRef  = doc(db, 'USERS', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.ProfileIMG) setProfileIMG(data.ProfileIMG);
          if (data.UserName)   setUserName(data.UserName);
        }
      } catch (e) {
        console.log('Profile fetch error:', e);
      }
    };
    fetchUserDoc();
  }, [user?.uid]);

  const displayName = userName;

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setSigningOut(true);
            try {
              await signOut(auth);

            } catch (e) {
              Alert.alert('Error', 'Failed to sign out. Try again.');
            } finally {
              setSigningOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      
      <View style={styles.header}>
        <Text style={styles.logo}>NETFLIX</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            {profileIMG && !imgError ? (
              <Image
                source={{ uri: profileIMG }}
                style={{
                  width: scaleW(82),
                  height: scaleW(82),
                  borderRadius: 6,
                }}
                resizeMode="cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <UserAvatar name={displayName} size={scaleW(82)} />
            )}
            <View style={styles.editBadge}>
              <EditIcon />
            </View>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{email}</Text>

          <TouchableOpacity style={styles.switchBtn} activeOpacity={0.8}>
            <Text style={styles.switchBtnText}>Switch Profile</Text>
          </TouchableOpacity>
        </View>
        <Section title="Account">
          <RowItem
            icon={<AccountIcon />}
            label="Account"
            subtitle="Manage your membership"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <RowItem
            icon={<NotificationIcon />}
            label="Notifications"
            subtitle="Push & email preferences"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <RowItem
            icon={<PrivacyIcon />}
            label="Privacy"
            subtitle="Data & permissions"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <RowItem
            icon={<HelpIcon />}
            label="Help"
            subtitle="FAQs & support"
            onPress={() => {}}
          />
        </Section>

        <Section>
          <RowItem
            icon={<SignOutIcon />}
            label={signingOut ? 'Signing Out...' : 'Sign Out'}
            onPress={handleSignOut}
            danger
          />
        </Section>

        <Text style={styles.version}>Netflix Clone • v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Header
  header: {
    paddingTop: ANDROID_SB + 14,
    paddingHorizontal: scaleW(20),
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logo: {
    color: '#E50914',
    fontSize: scaleFont(22),
    fontWeight: '900',
    letterSpacing: 3,
  },

  scroll: {
    paddingBottom: scaleH(40),
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingTop: scaleH(36),
    paddingBottom: scaleH(28),
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: scaleH(14),
  },
  editBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: scaleFont(22),
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  userEmail: {
    color: '#888',
    fontSize: scaleFont(13),
    marginBottom: scaleH(20),
  },
  switchBtn: {
    borderWidth: 1.5,
    borderColor: '#555',
    borderRadius: 4,
    paddingHorizontal: scaleW(22),
    paddingVertical: scaleH(8),
  },
  switchBtnText: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  section: {
    marginTop: scaleH(24),
    paddingHorizontal: scaleW(16),
  },
  sectionTitle: {
    color: '#888',
    fontSize: scaleFont(11),
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#141414',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleW(16),
    paddingVertical: scaleH(15),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(14),
    flex: 1,
  },
  rowIcon: {
    width: 28,
    alignItems: 'center',
  },
  rowLabel: {
    color: '#e0e0e0',
    fontSize: scaleFont(15),
    fontWeight: '500',
  },
  rowSubtitle: {
    color: '#666',
    fontSize: scaleFont(12),
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginLeft: scaleW(58),
  },

  version: {
    color: '#333',
    fontSize: scaleFont(12),
    textAlign: 'center',
    marginTop: scaleH(32),
  },
});