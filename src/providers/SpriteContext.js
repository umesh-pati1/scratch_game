import React, { createContext, useContext, useState } from "react";
import constants from "../resources/constants";

/**
 * Context for managing sprite-related data.
 * @type {React.Context<{
 *   sprites: React.RefObject<any>[],
 *   activeSprite: React.RefObject<any> | null,
 *   addSprite: () => void,
 *   setActive: (spriteRef: React.RefObject<any>) => void,
 *   updateSprite: () => void,
 *   removeSprite: (spriteId: string) => void,
 *   events: Record<string, { eventId: string, data: any, type:string }[]>,
 *   addEvent: (spriteId: string, type: string, extraData: string) => void,
 *   updateEvent: (spriteId: string, eventId: string, newData: any) => void,
 * } | null>}
 */
const SpriteContext = createContext(null);

export function useSprites() {
  return useContext(SpriteContext);
}

export function SpriteProvider({ children }) {
  const [sprites, setSprites] = useState([constants.DEFAULT_SPRITE]);
  const [activeSprite, setActiveSprite] = useState(constants.DEFAULT_SPRITE);

  /**
   * State for managing events tied to each sprite.
   *
   * @type {[Record<string, { eventId: string, data: any }[]>, React.Dispatch<React.SetStateAction<Record<string, { eventId: string, data: any }[]>>>]}
   */
  const [events, setEvents] = useState({});

  const addSprite = (spriteData) => {
    setSprites((prevSprites) => [...prevSprites, spriteData]);
  };

  const setActive = (spriteRef) => {
    setActiveSprite(spriteRef);
  };

  const updateSprite = (updatedSprite) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) =>
        sprite.id === updatedSprite.id ? updatedSprite : sprite
      )
    );
  };

  const removeSprite = (spriteId) => {
    setSprites((prevSprites) =>
      prevSprites.filter((sprite) => sprite.id !== spriteId)
    );

    // Remove associated events when the sprite is removed
    setEvents((prevEvents) => {
      const { [spriteId]: _, ...remainingEvents } = prevEvents;
      return remainingEvents;
    });

    if (activeSprite?.id === spriteId) {
      setActiveSprite(null);
    }
  };

  const addEvent = (spriteId, type, extraData) => {
    // Filter existing events of the same type for the given sprite
    const sameTypeEvents =
      events[spriteId]?.filter((event) => event.type.startsWith(type)) || [];

    // Generate a new unique eventId
    const newId = `${type.charAt(0).toUpperCase() + type.slice(1)}${
      sameTypeEvents.length + 1
    }`;

    // Create the new event object
    const event = {
      type: type,
      eventId: newId,
      data: JSON.parse(extraData),
    };

    // Update the events state with the new event
    setEvents((prevEvents) => ({
      ...prevEvents,
      [spriteId]: [...(prevEvents[spriteId] || []), event],
    }));
  };

  const updateEvent = (spriteId, eventId, newData) => {
    setEvents((prevEvents) => {
      const updatedEvents = (prevEvents[spriteId] || []).map((event) =>
        event.eventId === eventId ? { ...event, data: newData } : event
      );
      return {
        ...prevEvents,
        [spriteId]: updatedEvents,
      };
    });
  };

  const swapEvents = (sprite1Id, sprite2Id) => {
    setEvents((prevEvents) => {
      const sprite1Events = prevEvents[sprite1Id] || [];
      const sprite2Events = prevEvents[sprite2Id] || [];
      return {
        ...prevEvents,
        [sprite1Id]: sprite2Events,
        [sprite2Id]: sprite1Events,
      };
    });
  };

  return (
    <SpriteContext.Provider
      value={{
        sprites,
        activeSprite,
        addSprite,
        setActive,
        updateSprite,
        removeSprite,
        events,
        addEvent,
        updateEvent,
        swapEvents,
      }}
    >
      {children}
    </SpriteContext.Provider>
  );
}
