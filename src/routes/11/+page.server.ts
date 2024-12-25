export const load = async () => {
	let data = `\n\n\n<--WaterTracker(11var)-->

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="WaterTracker.MainPage"
             Title="Water Tracker">
    <VerticalStackLayout Spacing="20" Padding="20">
        <Label Text="Суточная норма (мл):" />
        <Entry x:Name="NormEntry" Keyboard="Numeric" Placeholder="Введите норму" />
        <Button Text="Установить норму" Clicked="SetDailyNorm_Clicked" />

        <Label Text="Добавить порцию:" />
        <HorizontalStackLayout Spacing="10">
            <Button Text="200 мл" Clicked="AddWater_Clicked" CommandParameter="200" />
            <Button Text="250 мл" Clicked="AddWater_Clicked" CommandParameter="250" />
            <Button Text="500 мл" Clicked="AddWater_Clicked" CommandParameter="500" />
        </HorizontalStackLayout>
        <Entry x:Name="ManualEntry" Keyboard="Numeric" Placeholder="Введите объем (мл)" />
        <Button Text="Добавить" Clicked="AddManualWater_Clicked" />

        <Label Text="Выпито:" />
        <ProgressBar x:Name="ProgressBar" ProgressColor="Blue" />
        <Label x:Name="ProgressLabel" Text="Выпито 0 мл из 0 мл" />
    </VerticalStackLayout>
</ContentPage>



namespace WaterTracker
{
    public partial class MainPage : ContentPage
    {
        private double dailyNorm = 0;
        private double consumedWater = 0;


        public MainPage()
        {
            InitializeComponent();
        }

        private void SetDailyNorm_Clicked(object sender, EventArgs e)
        {
            if (double.TryParse(NormEntry.Text, out double norm) && norm > 0)
            {
                dailyNorm = norm;
                UpdateProgress();
            }
            else
            {
                DisplayAlert("Ошибка", "Введите положительное число для нормы", "OK");
            }
        }

        private void AddWater_Clicked(object sender, EventArgs e)
        {
            if (double.TryParse(((Button)sender).CommandParameter.ToString(), out double amount))
            {
                AddWater(amount);
            }
        }

        private void AddManualWater_Clicked(object sender, EventArgs e)
        {
            if (double.TryParse(ManualEntry.Text, out double amount) && amount > 0)
            {
                AddWater(amount);
            }
            else
            {
                DisplayAlert("Ошибка", "Введите положительное число для объема", "OK");
            }
        }

        private void AddWater(double amount)
        {
            consumedWater += amount;
            UpdateProgress();
        }

        private void UpdateProgress()
        {
            ProgressBar.Progress = dailyNorm > 0 ? Math.Min(consumedWater / dailyNorm, 1) : 0;
            ProgressLabel.Text = $"Выпито {consumedWater:F0} мл из {dailyNorm:F0} мл";
        }
    }

}
<--WaterTracker(11var)-->



<--WaterTracker-desktop(11var)-->

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace ShoppingListAppWinForms
{
    public partial class MainForm : Form
    {
        private List<ShoppingItem> shoppingItems = new List<ShoppingItem>();
        private readonly string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "shoppingList.json");

        public MainForm()
        {
            InitializeComponent();
            LoadShoppingList();
        }

        // Обработчик нажатия кнопки "Добавить"
        private void addButton_Click(object sender, EventArgs e)
        {
            string name = itemNameTextBox.Text;
            string quantity = itemQuantityTextBox.Text;

            if (string.IsNullOrWhiteSpace(name))
            {
                MessageBox.Show("Введите название товара.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            shoppingItems.Add(new ShoppingItem { Name = name, Quantity = quantity });
            RefreshShoppingList();
            SaveShoppingList();

            itemNameTextBox.Text = string.Empty;
            itemQuantityTextBox.Text = string.Empty;
        }

        // Обработчик нажатия кнопки "Удалить"
        private void deleteButton_Click(object sender, EventArgs e)
        {
            if (shoppingListBox.SelectedItems.Count > 0)
            {
                var selectedItem = shoppingListBox.SelectedItems[0].Tag as ShoppingItem;
                if (selectedItem != null)
                {
                    shoppingItems.Remove(selectedItem);
                    RefreshShoppingList();
                    SaveShoppingList();
                }
            }
        }

        // Обработчик нажатия кнопки "Удалить купленные"
        private void deletePurchasedButton_Click(object sender, EventArgs e)
        {
            shoppingItems.RemoveAll(item => item.IsPurchased);
            RefreshShoppingList();
            SaveShoppingList();
        }

        // Обновление списка товаров
        private void RefreshShoppingList()
        {
            shoppingListBox.Items.Clear();
            foreach (var item in shoppingItems)
            {
                var listItem = new ListViewItem(new string[] { item.Name, item.Quantity });
                listItem.Tag = item;
                listItem.Checked = item.IsPurchased;
                shoppingListBox.Items.Add(listItem);
            }
        }

        // Сохранение списка в файл
        private void SaveShoppingList()
        {
            string json = JsonConvert.SerializeObject(shoppingItems);
            File.WriteAllText(filePath, json);
        }

        // Загрузка списка из файла
        private void LoadShoppingList()
        {
            if (File.Exists(filePath))
            {
                string json = File.ReadAllText(filePath);
                shoppingItems = JsonConvert.DeserializeObject<List<ShoppingItem>>(json) ?? new List<ShoppingItem>();
                RefreshShoppingList();
            }
        }
    }

    // Класс для представления товара
    public class ShoppingItem
    {
        public string Name { get; set; }
        public string Quantity { get; set; }
        public bool IsPurchased { get; set; }
    }
}


<--WaterTracker-desktop(11var)-->

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
