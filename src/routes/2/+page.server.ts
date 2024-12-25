export const load = async() => {
  let data = `\n
  MAUI CODE
  ==========================================================


  <--todolist(2var)-->

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="todolist.MainPage">

    <ScrollView Padding="30,0">
        <VerticalStackLayout Spacing="25">
            <Entry x:Name="title"
               Placeholder="Название задачи"
               PlaceholderColor="White" />
            <Entry x:Name="description"
               HeightRequest="200"
               Placeholder="Описание задачи"
               PlaceholderColor="White" />
            <Button x:Name="save"
                Text="Сохранить"
                Clicked="saveNote"
                HorizontalOptions="Fill" />
            <StackLayout x:Name="notesContainer">

            </StackLayout>
        </VerticalStackLayout>
    </ScrollView>
</ContentPage>


CSHARP
=======================================================


namespace todolist
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
            displayNotes();
        }

        private void saveNote(object sender, EventArgs e)
        {
            if (title.Text == null || description.Text == null)
            {
                DisplayAlert("Ошибка", "Пожалуйста, заполните все требуемые поля", "OK");
            }
            else
            {

                addNote(title.Text, description.Text);
                notesContainer.Clear();
                displayNotes();
            }
        }

        void displayNotes()
        {
            var notes = getAllNotes();
            foreach (var note in notes)
            {
                if (note != null)
                {
                    var notesLayout = new StackLayout();
                    var buttonsLayout = new HorizontalStackLayout();
                    var titleLabel = new Label();
                    var descriptionLabel = new Label();

                    buttonsLayout.Spacing = 16;

                    var deleteButton = new Button();
                    deleteButton.Text = "Удалить";
                    deleteButton.BackgroundColor = Colors.Red;
                    deleteButton.TextColor = Colors.White;
                    deleteButton.Resources.Add("id", note.Id);
                    deleteButton.WidthRequest = 100;
                    deleteButton.Clicked += (obj, e) =>
                    {
                        deleteNote(Convert.ToInt32(deleteButton.Resources["id"]));
                        notesContainer.Remove(notesLayout);
                    };

                    var markAsReadButton = new Button();
                    markAsReadButton.Text = "Выполнено";
                    markAsReadButton.Resources.Add("id", note.Id);
                    markAsReadButton.WidthRequest = 140;
                    markAsReadButton.Clicked += (obj, e) =>
                    {
                        deleteNote(Convert.ToInt32(markAsReadButton.Resources["id"]));
                        notesContainer.Remove(notesLayout);
                    };

                    titleLabel.Text = note.Title;
                    titleLabel.FontSize = 20;
                    descriptionLabel.Text = note.Description;

                    buttonsLayout.Add(deleteButton);
                    buttonsLayout.Add(markAsReadButton);

                    notesLayout.Add(titleLabel);
                    notesLayout.Add(descriptionLabel);
                    notesLayout.Add(buttonsLayout);

                    notesContainer.Children.Insert(0, notesLayout);
                }
            }
        }

        void addNote(string title, string description)
        {
            using (var db = new NotesContext())
            {
                var note = new Note
                {
                    Title = title,
                    Description = description,
                    CreatedDate = DateTime.Now,
                };

                db.Notes.Add(note);
                db.SaveChanges();
            }
        }

        List<Note> getAllNotes()
        {
            List<Note> notes;
            using (var db = new NotesContext())
            {
                notes = db.Notes.ToList();
            }
            return notes;

        }

        void deleteNote(int Id)
        {
            using (var db = new NotesContext())
            {
                var note = db.Notes.FirstOrDefault(x => x.Id == Id);
                if (note != null)
                {
                    db.Notes.Remove(note);
                    db.SaveChanges();
                }
            }
        }
    }
}




Note.cs

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace todolist
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}





NotesContext.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace todolist
{
    public class NotesContext: DbContext
    {
        public DbSet<Note> Notes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string dbPath = Path.Combine(FileSystem.AppDataDirectory, "notes.db");
            optionsBuilder.UseSqlite($"Filename={dbPath}");
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}







Код для Windows Forms
MainForm.cs
csharp
Copy
using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace TaskManagerAppWinForms
{
    public partial class MainForm : Form
    {
        private List<TaskItem> tasks = new List<TaskItem>();
        private readonly string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "tasks.json");

        public MainForm()
        {
            InitializeComponent();
            LoadTasks(); // Загрузка задач при запуске приложения
        }

        // Обработчик нажатия кнопки "Добавить задачу"
        private void addTaskButton_Click(object sender, EventArgs e)
        {
            string title = titleTextBox.Text;
            string description = descriptionTextBox.Text;

            if (string.IsNullOrWhiteSpace(title))
            {
                MessageBox.Show("Введите заголовок задачи.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Добавление новой задачи
            tasks.Add(new TaskItem { Title = title, Description = description });
            RefreshTaskList();
            SaveTasks();

            // Очистка полей ввода
            titleTextBox.Text = string.Empty;
            descriptionTextBox.Text = string.Empty;
        }

        // Обработчик нажатия кнопки "Выполнено"
        private void markAsCompletedButton_Click(object sender, EventArgs e)
        {
            if (tasksListView.SelectedItems.Count > 0)
            {
                var selectedTask = tasksListView.SelectedItems[0].Tag as TaskItem;
                if (selectedTask != null)
                {
                    // Удаление задачи из списка
                    tasks.Remove(selectedTask);
                    RefreshTaskList();
                    SaveTasks();
                }
            }
        }

        // Обработчик нажатия кнопки "Удалить"
        private void deleteTaskButton_Click(object sender, EventArgs e)
        {
            if (tasksListView.SelectedItems.Count > 0)
            {
                var selectedTask = tasksListView.SelectedItems[0].Tag as TaskItem;
                if (selectedTask != null)
                {
                    // Удаление задачи из списка
                    tasks.Remove(selectedTask);
                    RefreshTaskList();
                    SaveTasks();
                }
            }
        }

        // Обновление списка задач
        private void RefreshTaskList()
        {
            tasksListView.Items.Clear();
            foreach (var task in tasks)
            {
                var listItem = new ListViewItem(new string[] { task.Title, task.Description });
                listItem.Tag = task;
                tasksListView.Items.Add(listItem);
            }
        }

        // Сохранение задач в файл
        private void SaveTasks()
        {
            string json = JsonConvert.SerializeObject(tasks);
            File.WriteAllText(filePath, json);
        }

        // Загрузка задач из файла
        private void LoadTasks()
        {
            if (File.Exists(filePath))
            {
                string json = File.ReadAllText(filePath);
                tasks = JsonConvert.DeserializeObject<List<TaskItem>>(json) ?? new List<TaskItem>();
                RefreshTaskList();
            }
        }
    }

    // Класс для представления задачи
    public class TaskItem
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
\n\n\n\n\n\n\n\n\n`
return {data};
}