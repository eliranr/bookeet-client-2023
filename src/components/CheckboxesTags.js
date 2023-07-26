
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {workersState} from '../atom/modalAtom';
import {useRecoilState} from 'recoil';
import React, {useEffect, useState} from 'react'


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({exList, handleChange2}) {
  const [workers, setWorkers] = useRecoilState(workersState);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={workers}
      defaultValue={workers.filter((worker) => {
        if (exList.includes(worker.uid))
          return worker
      })}
      //disableCloseOnSelect
      getOptionLabel={(option) => option.info.name}
      onChange={(event, value) => {handleChange2(value)}}
      renderOption={(props, option, { selected }) => {
        return (
        <li 
          {...props}
        >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.info.name}
        </li>
      )}}
      style={{ width: '100%' }}
      renderInput={(params) => {
        return (
          <TextField {...params} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        )
      }}
    />
  );
}

