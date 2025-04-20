import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi' | 'ur' | 'pa')}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिंदी</SelectItem>
        <SelectItem value="ur">اردو</SelectItem>
        <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector; 