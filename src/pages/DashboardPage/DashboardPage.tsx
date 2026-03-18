import { DashboardPanel } from "../../components/User/Dashboard/DashboardPanel";
import { InfosUser } from "../../components/User/Infos/InfosUser";
import { InfosSettings } from "../../components/User/Settings/InfosSettings";
import { StatisticWord } from "../../components/User/Statistic/StatisticWords";
import { useAuth } from "../../hooks/useAuth";
import { useSettingsUser } from "../../hooks/useSettingsUser";

 const DashboardPage = () => {
  const { user } = useAuth();
  const { settings } = useSettingsUser();

  return (
    <div className="flex-1 bg-linear-to-b from-fuchsia-50 to-indigo-200 dark:from-indigo-950 dark:to-gray-950 py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* 👤 Informations utilisateur */}
        {user && <InfosUser user={user} />}

        {/* 🧭 Tableau de bord */}
        {settings && (
          <DashboardPanel
            childrens={{
              statistic: <StatisticWord />,
              params: <InfosSettings />,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default DashboardPage;