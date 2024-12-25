export const load = async () => {
	let data = `\n\n\n<--EEE(9var)-->

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="EEE.MainPage">

    <VerticalStackLayout Padding="20">

        <!-- Заголовок -->
        <Label Text="Отслеживание упражнений"
               FontSize="24"
               HorizontalOptions="Center" />

        <!-- Список упражнений -->
        <CollectionView x:Name="ExercisesListView">
            <CollectionView.ItemTemplate>
                <DataTemplate>
                    <StackLayout Padding="10">
                        <Label Text="{Binding Key}" FontSize="18"/>
                        <Label Text="{Binding Value, StringFormat='Выполнено: {0} раз'}" />
                        <Button Text="Выполнить"
                                Clicked="OnPerformExerciseClicked" 
                                CommandParameter="{Binding Key}" />
                        <Button Text="Удалить"
                                Clicked="OnDeleteExerciseClicked"
                                CommandParameter="{Binding Key}" />
                    </StackLayout>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>

        <!-- Поле для ввода названия нового упражнения -->
        <Entry x:Name="ExerciseNameEntry" Placeholder="Введите название упражнения" />

        <!-- Кнопка для добавления нового упражнения -->
        <Button Text="Добавить упражнение"
                Clicked="OnAddExerciseClicked" />

    </VerticalStackLayout>

</ContentPage>



using Microsoft.Maui.Controls;
using System;
using System.Collections.ObjectModel;
using System.Linq;

namespace EEE
{
    public partial class MainPage : ContentPage
    {
        // Коллекция для хранения упражнений в виде пар "Название упражнения" и "Счетчик выполнений"
        private ObservableCollection<KeyValuePair<string, int>> exercises;

        public MainPage()
        {
            InitializeComponent();
            exercises = new ObservableCollection<KeyValuePair<string, int>>(); // Инициализация коллекции
            ExercisesListView.ItemsSource = exercises; // Привязка коллекции к списку
        }

        // Метод для добавления нового упражнения
        private void OnAddExerciseClicked(object sender, EventArgs e)
        {
            string exerciseName = ExerciseNameEntry.Text?.Trim();
            if (string.IsNullOrEmpty(exerciseName))
            {
                DisplayAlert("Ошибка", "Введите название упражнения", "OK");
                return;
            }

            // Проверяем, не существует ли уже это упражнение
            if (!exercises.Any(ex => ex.Key == exerciseName))
            {
                // Добавляем новое упражнение с начальным счетчиком 0
                exercises.Add(new KeyValuePair<string, int>(exerciseName, 0));
                ExerciseNameEntry.Text = string.Empty; // Очищаем поле ввода
            }
            else
            {
                DisplayAlert("Ошибка", "Это упражнение уже добавлено", "OK");
            }
        }

        // Метод для выполнения упражнения
        private void OnPerformExerciseClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            string exerciseName = button?.CommandParameter as string;

            if (!string.IsNullOrEmpty(exerciseName))
            {
                // Находим упражнение по имени и увеличиваем счетчик
                var exercise = exercises.FirstOrDefault(ex => ex.Key == exerciseName);
                if (!exercise.Equals(default(KeyValuePair<string, int>)))
                {
                    exercises.Remove(exercise);
                    exercises.Add(new KeyValuePair<string, int>(exercise.Key, exercise.Value + 1)); // Увеличиваем счетчик
                }
            }
        }

        // Метод для удаления упражнения
        private void OnDeleteExerciseClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            string exerciseName = button?.CommandParameter as string;

            if (!string.IsNullOrEmpty(exerciseName))
            {
                // Находим упражнение по имени и удаляем его
                var exercise = exercises.FirstOrDefault(ex => ex.Key == exerciseName);
                if (!exercise.Equals(default(KeyValuePair<string, int>)))
                {
                    exercises.Remove(exercise); // Удаляем упражнение
                }
            }
        }
    }
}

<--EEE(9var)-->



<--EEE(9var)-desktop-->

using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace ZZZ

{
    public partial class Form1 : Form
    {
        private List<string> exercises; // Список упражнений
        private Dictionary<string, int> exerciseCounts; // Счетчик выполнений

        public Form1()
        {
            InitializeComponent();
            exercises = new List<string>();
            exerciseCounts = new Dictionary<string, int>();
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            string exerciseName = txtExerciseName.Text.Trim();

            if (string.IsNullOrEmpty(exerciseName))
            {
                MessageBox.Show("Введите название упражнения.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (exercises.Contains(exerciseName))
            {
                MessageBox.Show("Упражнение уже существует.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            exercises.Add(exerciseName);
            exerciseCounts[exerciseName] = 0; // Инициализация счетчика
            UpdateExerciseList();
            txtExerciseName.Clear();
        }

        private void btnComplete_Click(object sender, EventArgs e)
        {
            if (lstExercises.SelectedItem == null)
            {
                MessageBox.Show("Выберите упражнение для выполнения.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string selectedExercise = lstExercises.SelectedItem.ToString();
            exerciseCounts[selectedExercise]++;
            MessageBox.Show($"Упражнение '{selectedExercise}' выполнено {exerciseCounts[selectedExercise]} раз(а).");
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (lstExercises.SelectedItem == null)
            {
                MessageBox.Show("Выберите упражнение для удаления.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string selectedExercise = lstExercises.SelectedItem.ToString();
            exercises.Remove(selectedExercise);
            exerciseCounts.Remove(selectedExercise);
            UpdateExerciseList();
        }

        private void UpdateExerciseList()
        {
            lstExercises.Items.Clear();
            foreach (var exercise in exercises)
            {
                lstExercises.Items.Add(exercise);
            }
        }

        private void btnAdd_Click_1(object sender, EventArgs e)
        {
            string exerciseName = txtExerciseName.Text.Trim();

            if (string.IsNullOrEmpty(exerciseName))
            {
                MessageBox.Show("Введите название упражнения.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (exercises.Contains(exerciseName))
            {
                MessageBox.Show("Упражнение уже существует.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            exercises.Add(exerciseName);
            exerciseCounts[exerciseName] = 0; // Инициализация счетчика
            UpdateExerciseList();
            txtExerciseName.Clear();
        }

        private void btnComplete_Click_1(object sender, EventArgs e)
        {
            if (lstExercises.SelectedItem == null)
            {
                MessageBox.Show("Выберите упражнение для выполнения.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string selectedExercise = lstExercises.SelectedItem.ToString();
            exerciseCounts[selectedExercise]++;
            MessageBox.Show($"Упражнение '{selectedExercise}' выполнено {exerciseCounts[selectedExercise]} раз(а).");

        }

        private void btnDelete_Click_1(object sender, EventArgs e)
        {
            if (lstExercises.SelectedItem == null)
            {
                MessageBox.Show("Выберите упражнение для удаления.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string selectedExercise = lstExercises.SelectedItem.ToString();
            exercises.Remove(selectedExercise);
            exerciseCounts.Remove(selectedExercise);
            UpdateExerciseList();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}

<--EEE(9var)-desktop-->

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
