import Link from "next/link";
import SectionCard from "@/components/ui/SectionCard";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import SettingsRow from "@/components/ui/SettingsRow";
import {
  IconSettings, IconMapPin, IconGlobe, IconBell, IconHeart,
  IconShield, IconInfo, IconFileText, IconUsers, IconSun,
} from "@/assets/icons";
import { mockUser } from "@/lib/profile-mock";

export default function ProfileOverview() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="relative h-28 bg-linear-to-br from-primary to-green-600 rounded-t-2xl">
                <Link
                  href="#"
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                >
                  <IconSettings size={20} />
                </Link>
                <div className="absolute -bottom-10 left-5">
                  <ProfileAvatar initials={mockUser.initials} />
                </div>
              </div>
              <div className="px-5 pt-14 pb-5">
                <p className="font-bold text-gray-800 text-xl leading-tight">{mockUser.name}</p>
                <p className="text-sm text-gray-400 mt-0.5 mb-5">{mockUser.email}</p>
                <Link
                  href="/profile/edit"
                  className="block w-full text-center border border-primary text-primary text-sm font-semibold rounded-xl py-2.5 hover:bg-primary hover:text-white transition-all"
                >
                  Edit Profil
                </Link>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-4">

            <SectionCard title="Akun">
              <SettingsRow icon={<IconMapPin size={18} />} label="Alamat" href="#" />
              <SettingsRow icon={<IconGlobe size={18} />} label="Bahasa" href="#" />
              <SettingsRow icon={<IconFileText size={18} />} label="Berita" href="#" />
              <SettingsRow icon={<IconBell size={18} />} label="Notifikasi" href="#" />
              <SettingsRow icon={<IconHeart size={18} />} label="Wishlist" href="#" />
            </SectionCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SectionCard title="Tampilan">
                <SettingsRow icon={<IconSun size={18} />} label="Mode Tampilan" href="#" />
              </SectionCard>
              <SectionCard title="Pengguna">
                <SettingsRow icon={<IconUsers size={18} />} label="Ganti Pengguna" href="#" />
              </SectionCard>
            </div>

            <SectionCard title="Lainnya">
              <SettingsRow icon={<IconFileText size={18} />} label="Syarat &amp; Ketentuan" href="#" />
              <SettingsRow icon={<IconShield size={18} />} label="Kebijakan Privasi" href="#" />
              <SettingsRow icon={<IconInfo size={18} />} label="Tentang Kami" href="#" />
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}
