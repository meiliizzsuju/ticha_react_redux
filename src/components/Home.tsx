import React from 'react'
import DataTable from './DataTable'
import { Box } from '@mui/material'

export const Home = () => {
    return (
        <Box sx={{
            py: 3,
            px: 4
        }}>
            <Box sx={{
                textAlign: 'center',
                p: 1
            }}>
                <h1>Thanthisha (Ticha) Tinwannasirikul</h1>
                <p>react_redux assessment</p>
            </Box>
            <DataTable />
        </Box>
    )
}
