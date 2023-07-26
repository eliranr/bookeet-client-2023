import React, {useEffect, useState} from 'react'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {workersState} from '../atom/modalAtom';
import {useRecoilState} from 'recoil';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(theme) {
    return {
      fontWeight: theme.typography.fontWeightMedium
      //   personName.indexOf(name) === -1
      //     ? theme.typography.fontWeightRegular
      //     : theme.typography.fontWeightMedium,
    };
  }

export default function MultipleSelectChip({exList, handleChange2}) {
  const [workers, setWorkers] = useRecoilState(workersState);
  const theme = useTheme();




  const handleChange = (event, value) => {
    // console.log(exList)
    // console.log(value.props.value.uid)
    var newList = workers.filter((worker) => {
        if (exList.includes(worker.uid)) {
            return worker;
        }
    })

    var a = newList.find((element, index) => {
        return element.uid === value.props.value.uid
    });
    if (a != null) {
        newList = newList.filter((item) => {
            if (item.uid != a.uid) {
                return item
            }
        })
        //console.log('less')
    } else {
        newList.push(value.props.value);
        //console.log('add')
    }
    handleChange2(newList)
  };


  return (
    <Select
        multiple
        value={exList}
        onChange={handleChange}
        className='w-full inps p-0  min-h-[67px] border-0 ring-0'
        renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {workers.map((worker) => {
                if (selected.includes(worker.uid))
                    return (
                        <Chip key={worker.uid} label={worker.info.name} />
                    )
            })}
        </Box>
        )}
        MenuProps={MenuProps}
    >
        {workers.map((worker) => (
        <MenuItem
            key={worker.uid}
            value={worker}
            style={getStyles(theme)}
        >
            <Checkbox checked={exList.indexOf(worker.uid) > -1} />
            {worker.info.name}
        </MenuItem>
        ))}
    </Select>
  );
}
