import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import SettingsRow from "@/components/ui/SettingsRow";
import { mockUser, profileFields } from "@/lib/profile-mock";

export default function EditProfile() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <PageHeader title="Edit Profil" />

        <div className="space-y-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">
            <ProfileAvatar initials={mockUser.initials} size="lg" />
            <button className="px-5 py-2 border border-primary text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all">
              Ganti Foto Profil
            </button>
            <p className="text-xs text-gray-400 text-center">
              Minimal 800×800 px direkomendasikan. JPG atau PNG diperbolehkan.
            </p>
          </div>

          <SectionCard title="Profil">
            {profileFields.map(({ label, value }) => (
              <SettingsRow
                key={label}
                label={label}
                value={value || "—"}
                href="#"
                valueClassName={!value ? "text-gray-300" : ""}
              />
            ))}
          </SectionCard>

          <SectionCard title="Keamanan">
            <SettingsRow label="Kelola Perangkat Masuk" href="#" />
          </SectionCard>

          <div className="pt-2 pb-4 text-center">
            <button className="text-sm font-semibold text-primary hover:text-green-700 transition-colors py-3 px-8 rounded-xl hover:bg-green-50">
              Log Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
