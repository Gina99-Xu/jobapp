import { Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { SkillLevel } from '@/utils/types';

export function SingleSkillLevelSelect({ control }) {
  return (
    <Controller
      name='skillLevel'
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder='Select skill level' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SkillLevel).map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
