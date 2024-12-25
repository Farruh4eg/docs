export const load = async() => {
  let data = `\n\n\n<--Converter(5var)-->
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:Konverter"
             x:Class="Konverter.MainPage">

    <StackLayout Padding="20">
        <Label Text="Введите сумму для конвертации"
               HorizontalOptions="Center" />

      
        <Entry x:Name="AmountEntry"
               Keyboard="Numeric"
               Placeholder="Введите сумму"
               HorizontalOptions="FillAndExpand" />

    
        <Picker x:Name="FromCurrencyPicker" Title="Выберите исходную валюту" />
        <Picker x:Name="ToCurrencyPicker" Title="Выберите целевую валюту" />

       
        <Button Text="Конвертировать"
                Clicked="OnConvertButtonClicked" />

      
        <Label x:Name="ResultLabel"
               HorizontalOptions="Center"
               Text="Результат будет здесь" />
    </StackLayout>
</ContentPage>



namespace Konverter
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            InitializeCurrencies();
        }

      
        private void InitializeCurrencies()
        {
            FromCurrencyPicker.Items.Add("USD");
            FromCurrencyPicker.Items.Add("EUR");
            FromCurrencyPicker.Items.Add("GBP");

            ToCurrencyPicker.Items.Add("USD");
            ToCurrencyPicker.Items.Add("EUR");
            ToCurrencyPicker.Items.Add("GBP");

            FromCurrencyPicker.SelectedIndex = 0;
            ToCurrencyPicker.SelectedIndex = 1;
        }

       
        private void OnConvertButtonClicked(object sender, EventArgs e)
        {
            double amount = double.Parse(AmountEntry.Text);
            string fromCurrency = FromCurrencyPicker.SelectedItem.ToString();
            string toCurrency = ToCurrencyPicker.SelectedItem.ToString();
            double result = ConvertCurrency(amount, fromCurrency, toCurrency);
            ResultLabel.Text = $"Результат: {result} {toCurrency}";
        }

      
        private double ConvertCurrency(double amount, string fromCurrency, string toCurrency)
        {
           
            double exchangeRate = 1.0;

            if (fromCurrency == "USD" && toCurrency == "EUR")
                exchangeRate = 0.91;
            else if (fromCurrency == "EUR" && toCurrency == "USD")
                exchangeRate = 1.1;

            return amount * exchangeRate;
        }
    }
}









<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Konverter.ModifyRatesPage">

    <StackLayout Padding="20">
        <Label Text="Изменить курс валют"
               HorizontalOptions="Center" />

      
        <Label Text="Исходная валюта" />
        <Picker x:Name="FromCurrencyPicker" />

      
        <Label Text="Целевая валюта" />
        <Picker x:Name="ToCurrencyPicker" />

      
        <Label Text="Новый курс" />
        <Entry x:Name="NewRateEntry" Keyboard="Numeric" Placeholder="Введите курс" />

       
        <Button Text="Сохранить"
                Clicked="OnSaveButtonClicked" />
    </StackLayout>

</ContentPage>




using Microsoft.Maui.Controls;
using System.Collections.Generic;

namespace Konverter
{
    public partial class ModifyRatesPage : ContentPage
    {
        public ModifyRatesPage()
        {
            InitializeComponent();

           
            List<string> currencies = new List<string>
            {
                "USD",
                "EUR",
                "GBP",
            };

          
            FromCurrencyPicker.ItemsSource = currencies;
            ToCurrencyPicker.ItemsSource = currencies;
        }

       
        private void OnSaveButtonClicked(object sender, EventArgs e)
        {
          
            string fromCurrency = FromCurrencyPicker.SelectedItem?.ToString();
            string toCurrency = ToCurrencyPicker.SelectedItem?.ToString();

          
            if (string.IsNullOrEmpty(fromCurrency) || string.IsNullOrEmpty(toCurrency))
            {
                DisplayAlert("Ошибка", "Пожалуйста, выберите исходную и целевую валюту.", "Ок");
                return;
            }

          
            if (double.TryParse(NewRateEntry.Text, out double newRate))
            {
             
                DisplayAlert("Курс обновлен", $"Новый курс для {fromCurrency} в {toCurrency}: {newRate}", "OK");
            }
            else
            {
              
                DisplayAlert("Ошибка", "Введите корректный курс валюты.", "Ок");
            }
        }
    }
}

<--/Converter(5var)-->

\n\n\n\n\n\n\n\n\n`

return {data};
}