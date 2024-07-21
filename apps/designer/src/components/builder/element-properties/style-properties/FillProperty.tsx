import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useBuilder } from '@/components/builder/hooks/builder.hooks';
import { TbPlus, TbX } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip';
import DefaultFillInput from '@/components/DefaultFillInput';
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout';

const FillProperty = () => {
  const { updateElementChakraStyleData } = useBuilder();
  const { active_element, activeBreakpoint, allElements } = useSelector((state: AppStore) => state.renderer);

  const activeElement = allElements.find(el => el.dnd_id === active_element[0].dnd_id);
  const chakraProps = activeElement && activeElement.element_data.chakraProps;


  const areAllValuesSame = (obj: Record<string, string>) => {
    const values = Object.values(obj);
    return values.every(val => val === values[0]);
  };

  const updateFillColor = (color: string) => {
    const currentBackground = chakraProps?.background || {};
    if (activeBreakpoint === 'lg' && areAllValuesSame(currentBackground as any)) {
      updateElementChakraStyleData({
        element_id: active_element[0].element_data.element_id,
        newChakraStyle: {
          background: {
            base: color,
            md: color,
            lg: color,
          },
        },
      });
    } else {
      updateElementChakraStyleData({
        element_id: active_element[0].element_data.element_id,
        newChakraStyle: {
          //@ts-ignore
          background: {
            ...currentBackground,
            [activeBreakpoint]: color,
          },
        },
      });
    }
  };

  return (
    <EachPropertyLayout label={'Fill'} isEmpty={chakraProps && !chakraProps['background']} onAddValue={() => {
      updateFillColor("#ffff")
    }}>
            <DefaultFillInput
              //@ts-ignore
              value={chakraProps?.background?.[activeBreakpoint] || ''}
              onChange={e => updateFillColor(e)}
            />
            <DefaultTooltip content={'Remove'}>
              <button className={'text-muted-foreground hover:text-card-foreground'}>
                <TbX />
              </button>
            </DefaultTooltip>
    </EachPropertyLayout>
  );
};

export default FillProperty;
