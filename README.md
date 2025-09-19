# Task Manager CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/developedbyjay/taskmanager)

A powerful and intuitive command-line task manager application that helps you organize, track, and manage your tasks efficiently from the terminal.

## ✨ Features

- **Add Tasks**: Create new tasks with descriptions, priorities, and due dates
- **List Tasks**: View all tasks with filtering and sorting options
- **Update Tasks**: Modify task details, mark as complete/incomplete
- **Delete Tasks**: Remove tasks you no longer need
- **Priority Management**: Set task priorities (high, medium, low)
- **Due Date Tracking**: Set and track task deadlines
- **Search & Filter**: Find tasks by keywords, status, or priority
- **Categories/Tags**: Organize tasks with custom tags
- **Data Persistence**: Tasks are saved locally in JSON format
- **Colorful Output**: Beautiful terminal output with colors and formatting

## 🚀 Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Install from Source

```bash
# Clone the repository
git clone https://github.com/developedbyjay/taskmanager.git
cd taskmanager

# Install dependencies (if any)
pip install -r requirements.txt

# Make the script executable
chmod +x taskmanager.py
```

### Install via pip (Coming Soon)

```bash
pip install taskmanager-cli
```

## 📖 Usage

### Basic Commands

#### Add a Task
```bash
# Add a simple task
python taskmanager.py add "Complete project documentation"

# Add a task with priority
python taskmanager.py add "Fix critical bug" --priority high

# Add a task with due date
python taskmanager.py add "Submit report" --due "2024-01-15"

# Add a task with tags
python taskmanager.py add "Review code" --tags "work,urgent"
```

#### List Tasks
```bash
# List all tasks
python taskmanager.py list

# List tasks by status
python taskmanager.py list --status pending
python taskmanager.py list --status completed

# List tasks by priority
python taskmanager.py list --priority high

# List tasks due today
python taskmanager.py list --due today
```

#### Update Tasks
```bash
# Mark task as complete
python taskmanager.py complete 1

# Mark task as incomplete
python taskmanager.py incomplete 1

# Update task description
python taskmanager.py update 1 --description "New task description"

# Update task priority
python taskmanager.py update 1 --priority low
```

#### Delete Tasks
```bash
# Delete a specific task
python taskmanager.py delete 1

# Delete all completed tasks
python taskmanager.py delete --completed
```

#### Search Tasks
```bash
# Search tasks by keyword
python taskmanager.py search "documentation"

# Search with filters
python taskmanager.py search "bug" --priority high
```

### Advanced Usage

#### Task Priorities
- `high` - Critical tasks that need immediate attention
- `medium` - Important tasks with normal priority (default)
- `low` - Tasks that can be done when time permits

#### Date Formats
Supported date formats for due dates:
- `YYYY-MM-DD` (e.g., `2024-01-15`)
- `today`, `tomorrow`
- `monday`, `tuesday`, etc. (next occurrence)
- `+3d` (3 days from now)
- `+1w` (1 week from now)

#### Configuration
The application stores tasks in `~/.taskmanager/tasks.json` by default. You can customize the storage location by setting the `TASKMANAGER_DATA_DIR` environment variable:

```bash
export TASKMANAGER_DATA_DIR=/path/to/your/data/directory
```

## 🛠️ Development

### Setting up Development Environment

```bash
# Clone the repository
git clone https://github.com/developedbyjay/taskmanager.git
cd taskmanager

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
python -m pytest

# Run linting
flake8 taskmanager.py
black taskmanager.py
```

### Project Structure

```
taskmanager/
├── taskmanager.py          # Main application file
├── tests/                  # Unit tests
│   ├── test_tasks.py
│   └── test_cli.py
├── requirements.txt        # Production dependencies
├── requirements-dev.txt    # Development dependencies
├── setup.py               # Package setup
└── README.md              # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Write unit tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various CLI task management tools
- Thanks to all contributors who help improve this project
- Built with ❤️ for the developer community

## 📞 Support

If you encounter any issues or have questions:

- Open an [issue](https://github.com/developedbyjay/taskmanager/issues) on GitHub
- Check the [documentation](https://github.com/developedbyjay/taskmanager/wiki) (Coming Soon)

## 🗺️ Roadmap

- [ ] Add task categories/projects
- [ ] Implement task dependencies
- [ ] Add recurring tasks support
- [ ] Create web dashboard
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement team collaboration features
- [ ] Add mobile companion app

---

Made with ❤️ by [developedbyjay](https://github.com/developedbyjay)
