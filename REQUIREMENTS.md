# Initial project requirements

## Overview

The project is browser based piano visualisation with additional effects.

It can play midi signals from a connected midi keyboard, from a computer keyboard, by clicking with mouse (touch) on keys in the browser directly or by playing midi files. It also can show a score (music sheet) of a melody played.

From the user perspective the application contains:

 - Visual piano keyboard (3d and flat for slow computers) which produces sounds
 - MIDI player which plays midi files and controlling the visual keyboard while playing (visual keyboard keys are pressed when a related notes are played)
 - Visual effects when playing (like in synthesia)
 - Settings screen with information about connected midi keyboard, setting up number of available keys, visual setting e.t.c

## Technical

 - TypeScript
 - Firefox
 - Threejs
 - Vue/React
 - [DAT GUI](https://github.com/dataarts/dat.gui) (maybe vue/react will be enough, this maybe used for inline tweaks and during development)

### Components

 - Source component (computer keyboard, midi keyboard, midi player)
 - Presentation (virtual keyboard itself, visual effects)
 - Settings (stored locally in localStorage)

## References

- [3d-piano-player](https://www.borjamorales.com/3d-piano-player/) - can be used as a base reference and getting ideas
- [Euphony](https://github.com/qiao/euphony)
- [Synthesia](https://synthesia.app)
- [habr-link-about-MIDI.js] (https://habr.com/ru/post/257813/)

