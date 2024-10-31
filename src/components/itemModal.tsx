import { Box, Modal, Tab, Tabs } from '@mui/material'
import { Item } from '../redux/itemsSlice';
import { useState } from 'react';

interface ItemModalProps {
    open: boolean;
    onClose: () => void;
    selectedItem: Item | null;
}

const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, selectedItem }) => {
    const [value, setValue] = useState('1'); // State to manage tab selection

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={(theme) => ({
                    position: 'relative',
                    width: '80%',
                    maxWidth: 750,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: theme.shadows[5],
                    p: 4,
                })}
            >
                {selectedItem && (
                    <div>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Properties" value="1" />
                            <Tab label="Image" value="2" />
                        </Tabs>
                        {value === '1' && (
                            <Box sx={{ mt: 2 }}>
                                {Object.entries(selectedItem.properties).map(([key, value]) => {
                                    // Determine the style based on the key
                                    const alignright: React.CSSProperties = (key === 'propNumber' || key === 'date') ? { textAlign: 'right' } : {};

                                    return (
                                        <Box key={key} sx={{
                                            width: '100%',
                                            maxWidth: 300,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            py: 1,
                                        }}>
                                            <strong>{key}</strong>
                                            <span style={{
                                                minWidth: '10em',
                                                ...alignright
                                            }}>{value}</span>
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                        {value === '2' && (
                            <Box>
                                <img src={`http://localhost:8080/image/${selectedItem.guid}`} alt="image" loading="lazy" style={{width: '100%'}}/>
                            </Box>
                        )}
                    </div>
                )}
            </Box>
        </Modal>
    )
}

export default ItemModal;