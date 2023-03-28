import {
  HelloStrings,
  GoodbyeStrings,
  WelcomeMessage,
  GoodByeMessage,
  DontUnderstandMessage,
} from '@/utils/constants';

const handleMessage = (message: string): string => {
  // search string not found or hidden like "SomeSrtingGoodbyestring"
  const regexHello = new RegExp('\\b(' + HelloStrings.join('|') + ')\\b', 'gi');
  const regexGoodBye = new RegExp(
    '\\b(' + GoodbyeStrings.join('|') + ')\\b',
    'gi'
  );
  const matchesGoodBye = message.match(regexGoodBye);
  const matchesHello = message.match(regexHello);
  if (matchesGoodBye === null && matchesHello === null) {
    return DontUnderstandMessage;
  }

  const foundHello = findFirstMatchIndex(message, HelloStrings);
  const foundGoodbye = findFirstMatchIndex(message, GoodbyeStrings);
  if (
    (foundHello >= 0 && foundGoodbye === -1) ||
    (foundHello >= 0 && foundGoodbye !== -1 && foundHello < foundGoodbye)
  ) {
    return WelcomeMessage;
  } else if (
    (foundGoodbye >= 0 && foundHello === -1) ||
    (foundGoodbye >= 0 && foundHello !== -1 && foundGoodbye < foundHello)
  ) {
    return GoodByeMessage;
  } else {
    return DontUnderstandMessage;
  }
};

function findFirstMatchIndex(
  mainString: string,
  searchStrings: string[]
): number {
  for (let i = 0; i < searchStrings.length; i++) {
    const index = mainString
      .toLowerCase()
      .indexOf(searchStrings[i].toLowerCase());
    if (index !== -1) {
      return index;
    }
  }
  return -1;
}

export default handleMessage;
