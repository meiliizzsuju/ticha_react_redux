import { Box, Modal } from '@mui/material'
import { Item } from '../redux/itemsSlice';

interface ItemModalProps {
    open: boolean;
    onClose: () => void;
    selectedItem: Item | null;
  }

const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, selectedItem }) => {
  return (
    <Modal open={open} onClose={onClose}>
    <Box
      sx={(theme) => ({
        position: 'relative',
        width: 400,
        bgcolor: 'background.paper',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
      })}
    >
      {selectedItem && (
        <div>
          <p><strong>Path:</strong> {selectedItem.path.join(', ')}</p>
          {Object.entries(selectedItem.properties).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}
    </Box>
  </Modal>
  )
}

export default ItemModal;