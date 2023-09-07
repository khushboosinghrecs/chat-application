import React from 'react';
import {  useMessageContext } from 'stream-chat-react';

const TeamMessage = () => {
    const { handleOpenThread, message } = useMessageContext();

    return (
  
            <p>
                message
            </p>
    )
}

export default TeamMessage