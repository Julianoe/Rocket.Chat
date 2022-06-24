import { Box, Field, Modal, IconButton } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';
import MaskedInput from 'react-text-mask';

import { DialInput } from './DialInput';
import Pad from './Pad';
import { useDialPad } from './hooks/useDialPad';

const DialPadModal = ({ handleClose }: { handleClose: () => void }): ReactElement => {
	const {
		inputName,
		inputRef,
		inputError,
		isButtonDisabled,
		handleOnChange,
		handleBackspaceClick,
		handlePadButtonClick,
		handleCallButtonClick,
	} = useDialPad();

	const mask = (rawValue = ''): (string | RegExp)[] => ['+', /[1-9]/].concat(rawValue.split('').map(() => /\d/));
	return (
		<Modal w='400px'>
			<Modal.Header>
				<Modal.Title />
				<Modal.Close onClick={handleClose} />
			</Modal.Header>
			<Modal.Content display='flex' justifyContent='center' flexDirection='column'>
				<Field>
					<MaskedInput
						mask={mask}
						guide={false}
						render={(ref): ReactElement => (
							<DialInput
								ref={ref}
								inputName={inputName}
								inputRef={inputRef}
								inputError={inputError}
								handleBackspaceClick={handleBackspaceClick}
								isButtonDisabled={isButtonDisabled}
								handleOnChange={handleOnChange}
							/>
						)}
					/>
					<Field.Error h='20px' textAlign='center'>
						{inputError}
					</Field.Error>
				</Field>
				<Pad onClickPadButton={handlePadButtonClick} />
			</Modal.Content>
			<Modal.Footer>
				<Box display='flex' justifyContent='center'>
					<IconButton
						icon='phone'
						disabled={isButtonDisabled}
						borderRadius='full'
						secondary
						info
						size='64px'
						onClick={handleCallButtonClick}
					/>
				</Box>
			</Modal.Footer>
		</Modal>
	);
};

export default DialPadModal;
