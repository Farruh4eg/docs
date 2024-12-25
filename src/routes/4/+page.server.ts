export const load = async() => {
  let data = `\n\n\n<--4var-->

<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MauiApp1.MainPage"
             Title="Рецепты">
    <ContentPage.Content>
        <VerticalStackLayout Padding="10" Spacing="10">
            <!-- Поиск -->
            <SearchBar x:Name="SearchBar" Placeholder="Поиск рецептов..." TextChanged="OnSearchTextChanged" />

            <!-- Поля фильтрации -->
            <HorizontalStackLayout Spacing="5">
                <Entry x:Name="DishTypeEntry" Placeholder="Тип блюда" WidthRequest="150" />
                <Entry x:Name="CaloriesEntry" Placeholder="Макс калорий" Keyboard="Numeric" WidthRequest="100" />
            </HorizontalStackLayout>

            <!-- Список рецептов -->
            <CollectionView x:Name="RecipeList">
                <CollectionView.ItemTemplate>
                    <DataTemplate>
                        <Frame Margin="5" Padding="10" BackgroundColor="LightGray">
                            <HorizontalStackLayout>
                                <VerticalStackLayout Spacing="5" HorizontalOptions="FillAndExpand">
                                    <Label Text="{Binding Title}" FontAttributes="Bold" FontSize="18" />
                                    <Label Text="{Binding DishType}" FontSize="14" />
                                    <Label Text="{Binding Calories, StringFormat='Калории: {0} калорий'}" FontSize="14" TextColor="Gray" />
                                    <Label Text="{Binding Description}" FontSize="14" TextColor="DarkGray" LineBreakMode="WordWrap" />
                                </VerticalStackLayout>
                                <Button Text="Удалить" BackgroundColor="Red" TextColor="White" Clicked="OnDeleteRecipeClicked" />
                            </HorizontalStackLayout>
                        </Frame>
                    </DataTemplate>
                </CollectionView.ItemTemplate>
            </CollectionView>

            <!-- Кнопка для добавления рецепта -->
            <Button Text="Добавить рецепт" Clicked="OnAddRecipeClicked" />
        </VerticalStackLayout>
    </ContentPage.Content>
</ContentPage>




using System.Collections.ObjectModel; // Коллекции
using System.Linq;                    // LINQ (фильтрация, выборка)
using Microsoft.Maui.Controls;        // Базовые элементы управления MAUI

namespace MauiApp1;

public partial class MainPage : ContentPage
{
    // Простая модель рецепта
    public class Recipe
    {
        public string Title { get; set; }
        public string DishType { get; set; }
        public int Calories { get; set; }
        public string Description { get; set; }
    }

    // Коллекция для хранения рецептов
    private ObservableCollection<Recipe> _recipes = new();

    public MainPage()
    {
        InitializeComponent();
        RecipeList.ItemsSource = _recipes; // Привязываем коллекцию к UI
    }

    // Фильтрация и поиск рецептов
    private void OnSearchTextChanged(object sender, TextChangedEventArgs e)
    {
        string search = SearchBar.Text?.ToLower() ?? "";
        string dishType = DishTypeEntry.Text?.ToLower() ?? "";
        int.TryParse(CaloriesEntry.Text, out int maxCalories);

        RecipeList.ItemsSource = _recipes.Where(r =>
            (string.IsNullOrEmpty(search) || r.Title.ToLower().Contains(search)) &&
            (string.IsNullOrEmpty(dishType) || r.DishType.ToLower().Contains(dishType)) &&
            (maxCalories == 0 || r.Calories <= maxCalories)
        ).ToList();
    }

    // Добавление нового рецепта
    private async void OnAddRecipeClicked(object sender, EventArgs e)
    {
        string title = await DisplayPromptAsync("Новый рецепт", "Введите название:");
        string dishType = await DisplayPromptAsync("Новый рецепт", "Введите тип блюда:");
        string caloriesStr = await DisplayPromptAsync("Новый рецепт", "Введите калорийность:");
        string description = await DisplayPromptAsync("Новый рецепт", "Введите описание:");

        if (!int.TryParse(caloriesStr, out int calories)) calories = 0;

        if (!string.IsNullOrWhiteSpace(title) && !string.IsNullOrWhiteSpace(dishType))
        {
            _recipes.Add(new Recipe
            {
                Title = title,
                DishType = dishType,
                Calories = calories,
                Description = description
            });
        }
    }

    // Удаление выбранного рецепта
    private void OnDeleteRecipeClicked(object sender, EventArgs e)
    {
        if (sender is Button button && button.BindingContext is Recipe recipe)
        {
            // Удаляем рецепт из коллекции
            _recipes.Remove(recipe);

            // Обновляем список с учетом фильтров
            UpdateRecipeList();
        }
    }

    // Обновление списка рецептов после изменений
    private void UpdateRecipeList()
    {
        string search = SearchBar.Text?.ToLower() ?? "";
        string dishType = DishTypeEntry.Text?.ToLower() ?? "";
        int.TryParse(CaloriesEntry.Text, out int maxCalories);

        RecipeList.ItemsSource = _recipes.Where(r =>
            (string.IsNullOrEmpty(search) || r.Title.ToLower().Contains(search)) &&
            (string.IsNullOrEmpty(dishType) || r.DishType.ToLower().Contains(dishType)) &&
            (maxCalories == 0 || r.Calories <= maxCalories)
        ).ToList();
    }
}

<--/4var-->


\n\n\n\n\n\n\n\n\n`

return {data};
}