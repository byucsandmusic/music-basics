import TapAlong from '../components/TapAlong.vue'

// The language codes in this file have been defined by this resource: https://iso639-3.sil.org/code_tables/639/data
export const languages = Object.freeze({
    home: {
        title: {
            ENG: 'Music App',
        },
    },
    module0: {
        title: {
            ENG: 'Crash Course',
        },
        ending: {
            ENG:
                "You've completed the crash course! Now you have a solid foundation in " +
                'the basics of rhythm, pitch, and hymn reading. Keep practicing to ' +
                'sharpen your skills and explore more musical concepts!',
        },
        intro: {
            title: {
                ENG: 'Introduction',
            },
            quote: {
                ENG:
                    '"We get nearer to the Lord through music than perhaps through any other ' +
                    'thing except prayer.” - President J. Reuben Clark Jr.',
            },
            introParagraph: {
                ENG:
                    'Music is an important form of worship both at church and within the home. ' +
                    'Every Sunday meeting, congregations around the world join in singing three ' +
                    'to four sacred hymns meant to inspire unity and invite the Spirit into our hearts.\n\n' +
                    'Some may feel they can’t contribute to such worship because of a lack of musical ' +
                    'talent or skill. You’re not alone! The purpose of this basics module is to give ' +
                    'you a crash course on how to use the new hymn book and become more familiar with ' +
                    'the basics of singing.\n\n' +
                    'As you learn how to follow music from the hymn book, you will feel more prepared ' +
                    'to sing in church and at home!',
            },
        },
        readingVersesInfo: {
            title: {
                ENG: 'Reading Verses',
            },
            verseInfo: {
                ENG:
                    'There is so much on a page of music, it can be easy to get lost. ' +
                    'Let’s focus on the most important things first. The words of the hymn are ' +
                    'written in verse format with the number of each verse on the far left of the first line. ' +
                    'When singing a hymn, we sing verse 1 first, which is the top line of each part of the music. ',
            },
            chorusInfo: {
                ENG: 'Notice in the next part of the song, as we go to the next block of music, there are not three separate lines of text, just one:',
            },
            nextVerseInfo: {
                ENG:
                    'This helps us know that this song has a chorus - a part of the song that is sung with the same words after each verse. ' +
                    'When we get to the end of the final line, we go back up to the top of the song for verse 2.',
            },
        },
        readingVersesSingAlong: {
            title: {
                ENG: 'Reading Verses Sing-Along',
            },
            description: {
                ENG:
                    'Go ahead and give it a try now! Press play to play “I Am a Child of God.” ' +
                    'As it plays, notice which word is highlighted and follow along verse to chorus, verse to chorus.',
            },
        },
        rhythmInfo: {
            title: {
                ENG: 'Rhythm Basics',
            },
            basics: {
                ENG:
                    'Beyond the words we sing, there are two other things to know in order to begin reading music. ' +
                    "The first we’ll go over is rhythm. The rhythm of a song is what tells you when to sing a word and change what note you're singing. " +
                    'Looking at the music below, you’ll notice that groups of notes look similar or different to eachother:',
            },
            duration: {
                ENG: 'How the note looks tells you how much of the measure the note takes up. Feel free to press the play button and hear how long each of these notes takes up:',
            },
            diagramInfo: {
                ENG:
                    "Below is a diagram showing how much time each note is sung. Don't worry too much about knowing them by heart right now, " +
                    "but if you'd like to go more in depth and even practice a little, feel free to check out the Rhythm Module!",
            },
        },
        pitchInfo: {
            title: {
                ENG: 'Pitch Basics',
            },
            basics: {
                ENG:
                    'Now that we’ve learned a little bit about when to sing, let’s talk about how to know how high or low a note is. ' +
                    'This is called pitch. Take a look at some music below:',
            },
            notesOnSameLineInfo: {
                ENG:
                    'The notes are at different heights on the horizontal lines. A note that is at the same height is sung at the same pitch. ' +
                    'Try clicking on the notes to hear their pitch:',
            },
            ascendingNotesInfo: {
                ENG: 'If it’s higher than the note before, then the next note will be sung a bit higher:',
            },
            descendingNotesInfo: {
                ENG: 'As you probably guessed, if the note “goes down” on the lines it goes in pitch as well:',
            },
            conclusion: {
                ENG:
                    'While you’re getting the basics, don’t worry too much about how much higher or lower each note is. ' +
                    'Try focusing on singing along with the congregation and the piano or organ. ' +
                    'Knowing the basics will help you have a better idea of what the music will be doing next, ' +
                    'but knowing exactly what it will do will take a bit more time and practice. ' +
                    'We’ll do some quick activities, but If you want to learn more about pitch and get even more practice, ' +
                    'check out the Pitch Module!',
            },
        },
        pitchMatchingTunesCommon: {
            title: {
                ENG: 'Pitch Matching - "I Am a Child of God"',
            },
            description: {
                ENG:
                    'Now we’ll do a little practicing. Below are some bits of sheet music from I Am a Child of God and their tunes. ' +
                    'Listen to the tunes and from how the pitch moves, try matching them with the right sheet music. No worries if it takes a few tries!',
            },
        },
        pitchMatchingTunesNew: {
            title: {
                ENG: 'Pitch Matching - "As Bread Is Broken"',
            },
            description: {
                ENG: "Great job! Now let's do the same thing, but on a less familiar hymn.",
            },
        },
        pitchSingAlongCommon: {
            title: {
                ENG: 'Pitch Sing-Along - "I Am a Child of God"',
            },
            description: {
                ENG:
                    'Now let’s try singing along with "I Am a Child of God"! ' +
                    "Try noticing how the notes look different and go up and down. That's your pitch and rhythm!",
            },
        },
        pitchSingAlongNew: {
            title: {
                ENG: 'Pitch Sing-Along - "As Bread Is Broken"',
            },
            description: {
                ENG: 'Awesome! Let’s give it a go with a less familiar hymn:',
            },
        },
        melodyLineInfo: {
            title: {
                ENG: 'Focus on the Melody Line',
            },
            lastThingText: {
                ENG: 'Last thing about pitch! Most hymns look something like this:',
            },
            topLineInfo: {
                ENG:
                    'You probably noticed that there are a lot more notes than what we’ve been using for practice. ' +
                    'Don’t worry though! The only notes you need to worry about are the ones on the very top:',
            },
            melodyInfo: {
                ENG:
                    'This is the melody part. The other parts are harmonies and can be sung as well. ' +
                    'More about that will be covered in Module 2! For starters though, just focus on those top notes.',
            },
        },
        exploration: {
            title: {
                ENG: 'Exploration',
            },
            description: {
                ENG:
                    'Now that we’re a bit more familiar with sheet music, feel free to explore this sheet of music. ' +
                    'You can tap on most parts of the sheet music, and a pop up will tell you what that part is along ' +
                    'with a link to the module that covers it more in depth.',
            },
        },
        finish: {
            ENG:
                'Well done! You reached the end of the crash course. Hopefully you feel just a bit more able to sing along with us! ' +
                'Here’s a recap of what we did. If you see anything you missed or want to go back and try again, just click!',
        },
    },
    module1: {
        title: {
            ENG: 'Basics',
        },
        ending: {
            ENG:
                "Now you know the basics of reading a hymn. You're definitely ready " +
                'to sing in sacrament meeting now. Keep going to learn more about ' +
                'rhythms in music!',
        },
        explore: {
            title: {
                ENG: 'Hymn Exploration',
            },
            tooltips: {
                list: {
                    ENG:
                        'title/tempo/guitar/scriptures/introStart/introEnd/timeSig/perform/music/copyright/tune/' +
                        'slur/treble/bass/barLines/measure',
                },
                title: {
                    title: {
                        ENG: 'Title',
                    },
                    body: {
                        ENG: 'Title of the Hymn.<br/><span style="font-size: smaller;">You can search hymns by title in the back of the hymnal or online <a href="https://www.churchofjesuschrist.org/media/music?lang=eng">here</a>.</span>',
                    },
                },
                tempo: {
                    title: {
                        ENG: 'Tempo range',
                    },
                    body: {
                        ENG:
                            'The tempo marking shows how fast or slow a hymn should go. First, it shows the kind of note that gets the' +
                            ' main beat, the thing you tap your toe to or that the music leader conducts. And the numbers next to it ' +
                            'show how many beats per minute. This specific song says that the main beat is a half note and should be between ' +
                            '52-60 beats per minute. This is about one beat per second. See how the text ' +
                            'fits to the beat of the song? And that there are two darker notes in the space of the beat? ' +
                            'The interactive digital tools page of the hymnbook has an embedded metronome ' +
                            'where you can check how fast or slow the beat is. Access the digital tools for this hymn ' +
                            '<a href="' +
                            'https://www.churchofjesuschrist.org/media/music/songs/he-is-born-the-divine-christ-child?crumbs=hymns-for-home-and-church&lang=eng' +
                            '">here</a>.',
                    },
                },
                conductorNotes: {
                    title: {
                        ENG: 'Conductor notes',
                    },
                    body: {
                        ENG:
                            'Tips for the music leader will go here. This hymn can look like it has four beats, but because ' +
                            'it is a quick tempo, this note advises the conductor to conduct a basic two pattern with two quarter ' +
                            'notes in each beat. You can learn how to conduct different patterns ' +
                            "<a href='" +
                            'https://www.churchofjesuschrist.org/bc/content/shared/english/pdf/callings/music/conducting-course/ConductPatterns.pdf' +
                            "'>here</a>.",
                    },
                },
                guitar: {
                    title: {
                        ENG: 'Guitar chords',
                    },
                    body: {
                        ENG:
                            'Guitar Chords are given above the staff for those who are accompanying the congregation ' +
                            'on a guitar or other stringed instrument. <a href="#">Learn how to accompany the congregation on ' +
                            'guitar.</a>',
                    },
                },
                scriptures: {
                    title: {
                        ENG: 'Scriptures',
                    },
                    body: {
                        ENG:
                            '<a href="' +
                            'https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor/11?lang=eng&id=p23-p26#p23' +
                            '">1 Corinthians 11:23-26</a>, ' +
                            '<a href="' +
                            'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/18?lang=eng&id=p3-p13#p3' +
                            '">3 Nephi 18:3-13</a><br/>' +
                            'Hymns teach the doctrines of the gospel. Each hymn has scriptures that can teach us more about ' +
                            'the topic of the hymn. In the first presidency preface to the 1985 hymnbook, they wrote: “Hymns ' +
                            'can lift our spirits, give us courage, and move us to righteous action. They can fill our souls ' +
                            'with heavenly thoughts and bring us a spirit of peace. Hymns can also help us withstand the ' +
                            'temptations of the adversary. We encourage you to memorize your favorite hymns and study the ' +
                            'scriptures that relate to them. Then, if unworthy thoughts enter your mind, sing a hymn to yourself, ' +
                            'crowding out the evil with the good. Brothers and sisters, let us use the hymns to invite the Spirit ' +
                            'of the Lord into our congregations, our homes, and our personal lives. Let us memorize and ponder ' +
                            'them, recite and sing them, and partake of their spiritual nourishment. Know that the song of the ' +
                            'righteous is a prayer unto our Father in Heaven, “and it shall be answered with a blessing upon ' +
                            '[your] heads.”',
                    },
                },
                introStart: {
                    title: {
                        ENG: 'Introduction brackets (start)',
                    },
                    body: {
                        ENG: 'These brackets mark an introduction that the organist can play to prepare the congregation to sing the hymn.',
                    },
                },
                introEnd: {
                    title: {
                        ENG: 'Introduction brackets (end)',
                    },
                },
                timeSig: {
                    title: {
                        ENG: 'Time signature',
                    },
                    body: {
                        ENG:
                            'The time signature gives information about how many beats are in a measure and how you ' +
                            'might conduct the piece if you are the music leader. The top number usually tells us how ' +
                            'many beats are in the measure. The bottom number usually tells us what kind of note gets ' +
                            'the beat. This song is in 3/4, which means there are three beats in each ' +
                            'measure and the quarter note gets the beat.' +
                            "<a href='#'>Learn more about time signatures.</a>",
                    },
                },
                key: {
                    title: {
                        ENG: 'Key signature',
                    },
                    body: {
                        ENG:
                            'The key signature gives information about what notes are on the white and black keys of ' +
                            'the piano or organ. It also can tell you where the home note of the song is. This song has ' +
                            'one flat, which means that all the B’s are flat or to be played on the black note to the ' +
                            'left of B. It also tells us that we are in F major, so F is the home note of the song. ' +
                            '<a href="#">Learn more about key signatures.</a>',
                    },
                },
                verseInfo: {
                    title: {
                        ENG: 'Refrain marking',
                    },
                    body: {
                        ENG: 'Refrain is another word for chorus and it means that you will sing this each time after the verse.',
                    },
                },
                perform: {
                    title: {
                        ENG: 'Musical instructions',
                    },
                    body: {
                        ENG:
                            'Below the hymn are included useful tips for singing the hymn. For this specific hymn, it ' +
                            'is reminding congregants to sing the refrain after each verse.',
                    },
                },
                text: {
                    title: {
                        ENG: 'Text credits',
                    },
                    body: {
                        ENG: 'Text attribution. This will include who wrote the words of the hymn.',
                    },
                },
                music: {
                    title: {
                        ENG: 'Music credits',
                    },
                    body: {
                        ENG:
                            'Music attribution. This will include the composer or arranger of the hymn, or in this ' +
                            'case the tune name if its composer is not known. Be sure to check out the ' +
                            '<a href="' +
                            'https://www.churchofjesuschrist.org/study/manual/sacred-music-gospel-study-resource-pilot?lang=eng' +
                            '">About the Hymns</a>to learn more about the origins of the individual hymns.',
                    },
                },
                copyright: {
                    title: {
                        ENG: 'Copyright information',
                    },
                },
                tune: {
                    title: {
                        ENG: 'Tune name',
                    },
                },
                fermata: {
                    title: {
                        ENG: 'Fermata',
                    },
                    body: {
                        ENG: 'This means to hold this note longer than it is written. Watch your music director for cues about how long to hold the note.',
                    },
                },
                toRefrain: {
                    title: {
                        ENG: 'To refrain marking',
                    },
                    body: {
                        ENG:
                            'This is a reminder to go back to the top of the page to sing the refrain again after ' +
                            'the verse. Even after the final verse, the congregation will sing the refrain one last time.',
                    },
                },
                slur: {
                    title: { ENG: 'Slur' },
                    body: {
                        ENG:
                            'Slur or legato marking. This line is a reminder to sing these notes on the same syllable ' +
                            'in a smooth and connected way.',
                    },
                },
                treble: {
                    title: { ENG: 'Treble clef' },
                    body: {
                        ENG:
                            'A treble clef indicates that the notes are on the right half of the keyboard and are ' +
                            'usually above middle C. The soprano and alto notes of the hymn are usually written in ' +
                            "the treble clef. <a href='#'>Learn more about treble clef notes.</a>",
                    },
                },
                bass: {
                    title: { ENG: 'Bass clef' },
                    body: {
                        ENG:
                            'A bass clef indicates that the notes are on the left half of the keyboard and are ' +
                            'usually below middle C. The tenor and bass notes of the hymn are usually written in the ' +
                            "bass clef. <a href='#'>Learn more about bass clef notes.</a>",
                    },
                },
                barLines: {
                    title: {
                        ENG: 'Bar lines',
                    },
                    body: {
                        ENG: 'Bar lines divide the notated score into measures for easier reading and to organize the hymn in a clear meter.',
                    },
                },
                measure: {
                    title: {
                        ENG: 'Measure',
                    },
                    body: {
                        ENG: 'A measure is what is between bar lines.',
                    },
                },
            },
        },
        welcome: {
            title: {
                ENG: 'Welcome',
            },
        },
        overview: {
            title: {
                ENG: 'Basic Purpose and Overview',
            },
        },
        doctrine: {
            title: {
                ENG: 'The Doctrine',
            },
        },
    },
    module2: {
        title: {
            ENG: 'Rhythm',
        },
        rhythmInfo: {
            title: {
                ENG: 'Rhythm Basics',
            },
            basics: {
                ENG:
                    'Beyond the words we sing, there are two other things to know in order to begin reading music. ' +
                    "The first we’ll go over is rhythm. The rhythm of a song is what tells you when to sing a word and change what note you're singing. " +
                    'Looking at the music below, you’ll notice that groups of notes are separated by vertical lines:',
            },
            measureInfo: {
                ENG:
                    'Those bars each mark the beginning of a measure. A measure is like a small, organized "chunk" of music that helps keep everything in time. ' +
                    "Imagine you're clapping along to a song—if you clap " +
                    '"1, 2, 3, 4" over and over, each set of four counts is a measure. ' +
                    'If you look at the music again, you’ll also notice that some notes look similar or different from each other:',
            },
            wholeNoteInfo: {
                ENG:
                    'How the note looks tells you how much of the measure the note takes up. ' +
                    'For example, the whole note takes up the whole measure so that one note would take up all four claps:',
            },
            halfNoteInfo: {
                ENG:
                    'The next note is the half note which means it takes up half of the measure. ' +
                    'This means each of these notes is worth two claps:',
            },
            quarterNoteInfo: {
                ENG: 'Just like we cut the whole note into two half notes, we can split those two notes into four quarter notes, each taking up one claps:',
            },
            eighthNoteInfo: {
                ENG:
                    'The last kind of note we’ll cover is the 8th note. These are each half of a quarter note or half a clap each. ' +
                    'You’ll notice there’s two variations of this one. It looks like the one on the right when there are multiple next to each other:',
            },
            dottedNotesInfo: {
                ENG:
                    'Last thing and then we’ll have you try some rhythms yourself. Some notes, most commonly the half note, have a dot next to them. ' +
                    'This means they are worth one and a half of themselves. So a half note with a dot is 3 claps and a quarter note is worth 1 and a half claps.',
            },
        },
        rhythmTapAlongQuarterNotes: {
            title: {
                ENG: 'Rhythm Tap-Along - Quarter Notes',
            },
            description: {
                ENG:
                    'Now we’ll try using what we’ve learned. Each activity will have a rhythm for you to tap along with. ' +
                    'We’ll start simple with four quarter notes. When you press play, it will play the beat, ' +
                    'which is like the clapping that fills the measure, then it will play the rhythm for you to listen to. ' +
                    'After another 4 beats plays, it will be your turn to tap the rhythm instead of it playing the rhythm. ' +
                    'You can press tap or your spacebar along with what the rhythm should be. Give it a try!',
            },
        },
        rhythmTapAlongHalfNotes: {
            title: {
                ENG: 'Rhythm Tap-Along - Half Notes',
            },
            description: {
                ENG: 'Here are some half notes now. Give it a try!',
            },
        },
        rhythmTapAlongEighthNotes: {
            title: {
                ENG: 'Rhythm Tap-Along - Eighth Notes',
            },
            description: {
                ENG:
                    'Now we’ll try some eighth notes. Remember that these are half of a quarter note so you’ll be tapping twice as fast. ' +
                    'Give it a try!',
            },
        },
        rhythmTapAlongMixed1: {
            title: {
                ENG: 'Rhythm Tap-Along - Mixed Rhythms 1',
            },
            description: {
                ENG:
                    'Great job! If you want a bit of a challenge, the next few activities will begin mixing the kinds of notes together. ' +
                    'These rhythms are from a hymn you’ll probably recognize. We’ll have a chance to sing along to it next!',
            },
        },
        rhythmTapAlongMixed2: {
            title: {
                ENG: 'Rhythm Tap-Along - Mixed Rhythms 2',
            },
            description: {
                ENG: 'Here’s another rhythm to try. This one is a bit more challenging, but you can do it! ',
            },
        },
        rhythmSingAlongCommon: {
            title: {
                ENG: 'Rhythm Sing-Along - Common Hymn',
            },
            description: {
                ENG: 'Did you guess what it was? It’s <common hymn>! Try singing along but focus on the rhythm the notes are telling you as you do.',
            },
        },
    },
    module3: {
        title: {
            ENG: 'SATB',
        },
    },
    demo: {
        title: {
            ENG: 'Demo',
        },
        tapAlong: {
            title: {
                ENG: 'Tap Along Demo',
            },
        },
    },
    general: {
        home: {
            ENG: 'Home',
        },
        module: {
            ENG: 'Module',
        },
        dragAndDrop: {
            title: {
                ENG: 'Drag and Drop',
            },
        },
        matchTheSong: {
            title: {
                ENG: 'Match the Song',
            },
            textIndicatorDefault: {
                ENG: 'Place your answer into the box below!',
            },
            incorrectIndicator: {
                ENG: 'Sorry, that is incorrect. Try again?',
            },
            instructions: {
                ENG: 'Please place the sheet inside the box below',
            },
        },
        ending: {
            ENG: "Congratulations! You've finished the / module",
        },
        loremIpsum: {
            ENG:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' +
                'et dolore\n magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
                'aliquip ex ea commodo\n    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
                'cillum dolore eu fugiat nulla pariatur.\n    Excepteur sint occaecat cupidatat non proident, sunt in' +
                'culpa qui officia deserunt mollit anim id est laborum.',
        },
        musicNotation: {
            error: {
                midiPlayer: {
                    ENG: 'Error: Unable to load midi player',
                },
            },
        },
        notFound: {
            header: {
                ENG: 'Page not found',
            },
            body: {
                ENG: 'Redirecting...',
            },
        },
        singAlong: {
            title: {
                ENG: 'Sing Along Activity',
            },
            description: {
                ENG: "Sing along with the lyrics while matching the pitch of each note as it's played!",
            },
        },
        tapAlong: {
            easyTitle: {
                ENG: 'Easy Tap Along Activity',
            },
            hardTitle: {
                ENG: 'Hard Tap Along Activity',
            },
            play: {
                ENG: 'Play',
            },
            reset: {
                ENG: 'Reset',
            },
            instructions: {
                intro: {
                    ENG: 'Click PLAY to begin!',
                },
                beat: {
                    ENG: 'Here is the beat... ',
                },
                rhythm: {
                    ENG: 'Now listen to the rhythm',
                },
                prep: {
                    ENG: 'Your turn after 4... ',
                },
                go: {
                    ENG: 'Go!',
                },
                succeeded: {
                    ENG: 'Nice job!',
                },
                almost: {
                    ENG: 'So close, try again!',
                },
                failed: {
                    ENG: 'Not quite, try again!',
                },
                noTaps: {
                    ENG: 'No taps detected, press tap or spacebar with the rhythm!',
                },
                incomplete_part_1: {
                    ENG: 'Looks like you tapped for just ',
                },
                incomplete_part_2: {
                    ENG: ' notes instead of all ',
                },
                incomplete_part_3: {
                    ENG: ' notes. Try again!',
                },
            },
            input: {
                instructions: {
                    ENG: 'Enter Rhythm (comma-separated and equal to 4 beats):',
                },
                enter: {
                    ENG: 'Enter',
                },
                errorMessage: {
                    ENG: 'Make sure the rhythm adds up to 4 beats!',
                },
            },
        },
    },
})
