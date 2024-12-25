export const load = async () => {
	let data = `\n\n\n<--13var-->

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="ShoppingListApp.MainPage">

    <VerticalStackLayout Spacing="20" Padding="20">

        <!-- Заголовок -->
        <Label Text="Список покупок" FontSize="24" HorizontalOptions="Center" />

        <!-- Поле для ввода названия товара -->
        <Entry x:Name="ItemNameEntry" Placeholder="Название товара" />

        <!-- Поле для ввода количества -->
        <Entry x:Name="ItemQuantityEntry" Placeholder="Количество" Keyboard="Numeric" />

        <!-- Кнопка для добавления товара -->
        <Button Text="Добавить" Clicked="OnAddItemClicked" />

        <!-- Список товаров -->
        <ListView x:Name="ItemsListView" SelectionMode="None">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <ViewCell>
                        <HorizontalStackLayout Spacing="10">
                            <!-- Чекбокс для отметки покупки -->
                            <CheckBox IsChecked="{Binding IsPurchased}" />
                            <!-- Название товара -->
                            <Label Text="{Binding Name}" />
                            <!-- Количество -->
                            <Label Text="{Binding Quantity}" />
                            <!-- Кнопка для удаления товара -->
                            <Button Text="Удалить" Clicked="OnDeleteItemClicked" BackgroundColor="Red" />
                        </HorizontalStackLayout>
                    </ViewCell>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>

        <!-- Кнопка для удаления купленных товаров -->
        <Button Text="Удалить купленные" Clicked="OnDeletePurchasedClicked" />
    </VerticalStackLayout>

</ContentPage>




using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Maui.Controls;

namespace ShoppingListApp
{
    public partial class MainPage : ContentPage
    {
        private List<ShoppingItem> shoppingItems = new List<ShoppingItem>();
        private readonly string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "shoppingList.txt");

        // Конструктор, инициализирующий компоненты
        public MainPage()
        {
            InitializeComponent();  // Инициализация компонентов XAML
            LoadShoppingList();  // Загрузка списка при старте
        }

        // Обработчик нажатия кнопки "Добавить"
        private void OnAddItemClicked(object sender, EventArgs e)
        {
            string name = ItemNameEntry.Text;
            string quantity = ItemQuantityEntry.Text;

            if (string.IsNullOrWhiteSpace(name))
            {
                DisplayAlert("Ошибка", "Введите название товара.", "OK");
                return;
            }

            // Добавляем новый товар в список
            shoppingItems.Add(new ShoppingItem { Name = name, Quantity = quantity, IsPurchased = false });
            RefreshShoppingList();
            SaveShoppingList();

            // Очищаем поля ввода
            ItemNameEntry.Text = string.Empty;
            ItemQuantityEntry.Text = string.Empty;
        }

        // Обработчик нажатия кнопки "Удалить"
        private void OnDeleteItemClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var item = button?.BindingContext as ShoppingItem;

            if (item != null)
            {
                shoppingItems.Remove(item);
                RefreshShoppingList();
                SaveShoppingList();
            }
        }

        // Обработчик нажатия кнопки "Удалить купленные"
        private void OnDeletePurchasedClicked(object sender, EventArgs e)
        {
            // Удаляем все купленные товары
            shoppingItems.RemoveAll(item => item.IsPurchased);
            RefreshShoppingList();
            SaveShoppingList();
        }

        // Обновление списка товаров в UI
        private void RefreshShoppingList()
        {
            ItemsListView.ItemsSource = null;  // Обновляем источник данных
            ItemsListView.ItemsSource = shoppingItems;
        }

        // Сохранение списка покупок в файл
        private void SaveShoppingList()
        {
            // Сохраняем каждый товар в виде строки в файле
            var lines = new List<string>();
            foreach (var item in shoppingItems)
            {
                lines.Add($"{item.Name},{item.Quantity},{item.IsPurchased}");
            }
            File.WriteAllLines(filePath, lines);
        }

        // Загрузка списка покупок из файла
        private void LoadShoppingList()
        {
            if (File.Exists(filePath))
            {
                var lines = File.ReadAllLines(filePath);
                foreach (var line in lines)
                {
                    var parts = line.Split(',');
                    if (parts.Length == 3)
                    {
                        shoppingItems.Add(new ShoppingItem
                        {
                            Name = parts[0],
                            Quantity = parts[1],
                            IsPurchased = bool.Parse(parts[2])
                        });
                    }
                }
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

<--13var-->

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
