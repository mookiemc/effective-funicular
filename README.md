# Arkansas Driver's Exam Review App

A comprehensive web-based study application for the Arkansas driver's license exam. This app helps students prepare with practice questions, performance tracking, and focused review of weak areas.

## Features

- **120 Practice Questions** - Comprehensive coverage of all Arkansas driver's license exam topics
- **Mixed Question Types** - Both True/False and Multiple Choice questions
- **Performance Tracking** - Automatic tracking of correct/incorrect answers by category
- **Review Missed Questions** - Focus on questions you've answered incorrectly
- **Topic-Based Study** - Study specific categories like Arkansas Law, Safe Driving, etc.
- **Statistics Dashboard** - View your overall progress and identify weak areas
- **Local Storage** - All progress saved automatically in your browser
- **Mobile Responsive** - Works on all devices (phones, tablets, computers)
- **Google Sites Compatible** - Can be embedded in Google Sites

## Question Categories

1. **Arkansas Law** - Seat belt laws, child safety, school bus laws, licensing, insurance
2. **Rules and Regulations** - Work zones, traffic signals, signs, speed limits
3. **General Driving** - Lane usage, right of way, parking, turns, passing
4. **Safe Driving** - Distracted driving, speed management, weather conditions
5. **Sharing the Road** - Bicycles, motorcycles, large vehicles, pedestrians
6. **Driving Fitness** - Vision, alcohol/drugs, medications, physical fitness
7. **Emergencies** - Vehicle breakdowns, crashes, emergency procedures
8. **Skills Test** - Parking, maneuvers, test requirements

## Files

- `index.html` - Main application structure
- `styles.css` - Responsive styling and design
- `app.js` - Application logic and functionality
- `questions.json` - Question database (120 questions)
- `README.md` - This file
- `EMBEDDING_GUIDE.md` - Instructions for embedding in Google Sites

## How to Use

### Option 1: Open Locally

1. Download all files to a folder on your computer
2. Open `index.html` in a web browser (Chrome, Firefox, Safari, Edge)
3. Start studying!

### Option 2: Host Online

1. Upload all files to a web hosting service:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Any web hosting service
2. Access via the URL provided by your hosting service

### Option 3: Embed in Google Sites

See `EMBEDDING_GUIDE.md` for detailed instructions on embedding this app in Google Sites.

## Using the App

### Getting Started

1. **Welcome Screen** - Click "Start Studying" to begin with all questions
2. **Choose Your Mode:**
   - **All Questions** - Random questions from all categories
   - **Review Missed** - Only questions you've answered incorrectly
   - **By Topic** - Select a specific category to study
   - **My Stats** - View your performance statistics

### Answering Questions

1. Read the question carefully
2. Click your answer choice
3. Immediate feedback shows if you're correct or incorrect
4. Read the explanation to understand the rule
5. Click "Next Question" to continue

### Tracking Progress

- **Progress** - Shows how many questions you've answered (top of screen)
- **Accuracy** - Shows your overall percentage correct
- **Missed Count** - Number of questions to review

### Statistics

View detailed statistics including:
- Total questions answered
- Overall accuracy percentage
- Performance by category
- Specific recommendations for improvement

### Reset Progress

Click "Reset All Progress" on the welcome screen to clear all saved data and start over.

## Tips for Success

1. **Study All Categories** - Make sure you practice questions from all topics
2. **Review Missed Questions** - Use the "Review Missed" mode to focus on weak areas
3. **Read Explanations** - Understanding why an answer is correct helps you remember
4. **Aim for 80%+** - Try to achieve at least 80% accuracy before taking the real exam
5. **Practice Regularly** - Short, frequent study sessions are more effective than cramming

## Technical Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage enabled (for saving progress)
- Internet connection only needed for initial load

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Data Privacy

All data is stored locally in your browser using LocalStorage. No data is sent to any server. Your progress is private and stays on your device.

**Note:** Clearing browser data/cache will delete your progress.

## Offline Use

After the first load, the app can work offline if you:
1. Save the files locally, OR
2. Use a service worker (advanced users)

## Troubleshooting

### Questions not loading
- Check that all files are in the same folder
- Make sure `questions.json` is present
- Check browser console for errors (F12)

### Progress not saving
- Ensure LocalStorage is enabled in browser settings
- Check that you're not in Private/Incognito mode
- Try a different browser

### Display issues on mobile
- Rotate device to landscape for better view
- Zoom in/out to adjust text size
- Use a modern browser

## Future Enhancements (Potential)

- Timed practice mode
- Printable progress reports
- Audio feedback
- Dark mode
- Flashcard mode
- Study streaks and achievements

## Credits

Questions based on the Arkansas Driver License Study Guide (Volume 1, Edition 10, January 2026) published by the Arkansas Department of Finance and Administration.

## License

This educational tool is provided for study purposes. Questions are derived from publicly available Arkansas driver's license study materials.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Ensure all files are present and unmodified
3. Try a different browser
4. Clear cache and reload

## Version

Version 1.0 - Initial Release

---

**Good luck on your Arkansas driver's license exam!** 🚗
