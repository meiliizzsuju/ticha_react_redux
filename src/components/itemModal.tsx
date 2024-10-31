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
                            <div>
                                <p><strong>Path:</strong> {selectedItem.path.join(', ')}</p>
                                {Object.entries(selectedItem.properties).map(([key, value]) => (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                ))}
                            </div>
                        )}
                        {value === '2' && (
                            <div>
                                image here
                            </div>
                        )}
                    </div>
                )}
            </Box>
        </Modal>
    )
}

export default ItemModal;