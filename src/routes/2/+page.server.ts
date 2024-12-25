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
\n\n\n\n\n\n\n\n\n`
return {data};
}