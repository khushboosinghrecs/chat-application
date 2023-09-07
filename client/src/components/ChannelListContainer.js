import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

const Icon = 'data:image/png;base64,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';


const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={Icon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img  alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Medical Pager</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            </div>
        </>
    )

}

export default ChannelListContainer;