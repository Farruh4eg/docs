export const load = async() => {
  let data = `\n\n\n
  APPSHELL.XAML 

       <?xml version="1.0" encoding="utf-8" ?>
<Shell xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
       xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
       xmlns:local="clr-namespace:Konverter"
       x:Class="Konverter.AppShell">


    <TabBar>
        <ShellContent Title="Главная"
                      ContentTemplate="{DataTemplate local:MainPage}" />
        <ShellContent Title="Изменить курс"
                      Route="ModifyRatesPage"
                      ContentTemplate="{DataTemplate local:ModifyRatesPage}" />
    </TabBar>
</Shell>





  <--Converter(5var)-->
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



СИШАРП ДЕКСТОП 

using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace konverter2
{
    public partial class Form1 : Form
    {
       
        private Dictionary<string, decimal> exchangeRates;

        public Form1()
        {
            InitializeComponent();
            InitializeCurrencyData();
        }

      
        private void InitializeCurrencyData()
        {
            exchangeRates = new Dictionary<string, decimal>
            {
                { "USD", 1.0m }, 
                { "EUR", 0.85m },
                { "GBP", 0.75m },
                { "JPY", 110.0m }
            };

         
            cmbFromCurrency.Items.AddRange(new string[] { "USD", "EUR", "GBP", "JPY" });
            cmbToCurrency.Items.AddRange(new string[] { "USD", "EUR", "GBP", "JPY" });
            cmbChangeCurrency.Items.AddRange(new string[] { "USD", "EUR", "GBP", "JPY" });
            cmbChangeCurrency1.Items.AddRange(new string[] { "USD", "EUR", "GBP", "JPY" }); 

       
            cmbFromCurrency.SelectedIndex = 0;
            cmbToCurrency.SelectedIndex = 1;
            cmbChangeCurrency.SelectedIndex = 0;
            cmbChangeCurrency1.SelectedIndex = 0; 
        }

       
        private void btnConvert_Click(object sender, EventArgs e)
        {
            try
            {
                decimal amount = decimal.Parse(txtAmount.Text);
                string fromCurrency = cmbFromCurrency.SelectedItem.ToString();
                string toCurrency = cmbToCurrency.SelectedItem.ToString();


                decimal fromRate = exchangeRates[fromCurrency];
                decimal toRate = exchangeRates[toCurrency];

                decimal result = amount * (toRate / fromRate);
                txtResult.Text = $"{result:F2} {toCurrency}";
            }
            catch (FormatException)
            {
                MessageBox.Show("Введите правильную сумму для конвертации.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

       
        private void btnSaveRate_Click(object sender, EventArgs e)
        {
            try
            {
                string selectedCurrency = cmbChangeCurrency.SelectedItem.ToString();
                decimal newRate = decimal.Parse(txtNewRate.Text);
                exchangeRates[selectedCurrency] = newRate;

                MessageBox.Show($"Курс для {selectedCurrency} успешно обновлён!", "Обновление курса", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (FormatException)
            {
                MessageBox.Show("Введите правильный курс валюты.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

    
        private void btnSaveRate1_Click(object sender, EventArgs e)
        {
            try
            {
                string selectedCurrency = cmbChangeCurrency1.SelectedItem.ToString();
                decimal newRate = decimal.Parse(txtNewRate.Text); 


                exchangeRates[selectedCurrency] = newRate;

                MessageBox.Show($"Курс для {selectedCurrency} успешно обновлён!", "Обновление курса", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (FormatException)
            {
                MessageBox.Show("Введите правильный курс для выбранной валюты.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}


\n\n\n\n\n\n\n\n\n`

return {data};
}