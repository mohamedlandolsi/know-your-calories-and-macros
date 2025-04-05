import { useLanguage } from '@/lib/i18n';

export default function AdDisclaimer() {
  const { t } = useLanguage();
  
  return (
    <div className="text-xs text-center text-muted-foreground mt-6 px-4">
      {t('adDisclaimer')}
    </div>
  );
}
