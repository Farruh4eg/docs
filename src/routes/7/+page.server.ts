export const load = async () => {
	let data = `\n\n\n<--TaxiApp-->

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:local="clr-namespace:TaxiApp"
             x:Class="TaxiApp.MainPage"
             BackgroundColor="{DynamicResource PageBackgroundColor}">

    <BlazorWebView x:Name="blazorWebView" HostPage="wwwroot/index.html">
        <BlazorWebView.RootComponents>
            <RootComponent Selector="#app" ComponentType="{x:Type local:Components.Routes}" />
        </BlazorWebView.RootComponents>
    </BlazorWebView>
    <ScrollView>
        <VerticalStackLayout Padding="30">

            <!-- Поле для ввода номера телефона -->
            <Entry x:Name="PhoneNumberEntry"
                   Placeholder="Введите номер телефона"
                   Keyboard="Telephone" />

            <!-- Поле для ввода пароля -->
            <Entry x:Name="PasswordEntry"
                   Placeholder="Введите пароль"
                   IsPassword="True" />

            <!-- Кнопка "Войти" -->
            <Button Text="Войти"
                    Clicked="OnLoginClicked" />

            <!-- Поле для ввода начального адреса -->
            <Entry x:Name="StartAddressEntry"
                   Placeholder="Начальный адрес" />

            <!-- Поле для ввода конечного адреса -->
            <Entry x:Name="EndAddressEntry"
                   Placeholder="Конечный адрес" />

            <!-- Кнопка "Вызвать такси" -->
            <Button Text="Вызвать такси"
                    Clicked="OnCallTaxiClicked" />
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>


using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace TaxiApp
{
    public partial class MainPage : ContentPage
    {
        // Конструктор
        public MainPage()
        {
            InitializeComponent();
        }

        // Обработчик для кнопки "Войти"
        private async void OnLoginClicked(object sender, EventArgs e)
        {
            string phoneNumber = PhoneNumberEntry.Text;
            string password = PasswordEntry.Text;

            // Проверка на правильность номера телефона
            if (string.IsNullOrEmpty(phoneNumber) || !IsValidPhoneNumber(phoneNumber))
            {
                await DisplayAlert("Ошибка", "Неверный формат номера телефона", "OK");
                return;
            }

            // Проверка на пустой пароль
            if (string.IsNullOrEmpty(password))
            {
                await DisplayAlert("Ошибка", "Пароль не может быть пустым", "OK");
                return;
            }

            // Здесь должна быть реальная аутентификация через API или базу данных
            bool isAuthorized = await AuthenticateUser(phoneNumber, password);

            if (isAuthorized)
            {
                await DisplayAlert("Успех", "Вы успешно вошли", "OK");
            }
            else
            {
                await DisplayAlert("Ошибка", "Неверный номер телефона или пароль", "OK");
            }
        }

        // Метод для проверки номера телефона
        private bool IsValidPhoneNumber(string phoneNumber)
        {
            // Простой формат для проверки номера телефона (можно настроить)
            var regex = new Regex(@"^\+?\d{10,15}$");
            return regex.IsMatch(phoneNumber);
        }

        // Метод для аутентификации пользователя (имитация)
        private async Task<bool> AuthenticateUser(string phoneNumber, string password)
        {
            // В реальном приложении выполняется запрос на сервер для аутентификации
            await Task.Delay(1000); // Имитируем задержку
            return phoneNumber == "89969409869" && password == "password"; // Пример
        }

        // Обработчик для кнопки "Вызвать такси"
        private async void OnCallTaxiClicked(object sender, EventArgs e)
        {
            string startAddress = StartAddressEntry.Text;
            string endAddress = EndAddressEntry.Text;

            // Проверка на пустые адреса
            if (string.IsNullOrEmpty(startAddress) || string.IsNullOrEmpty(endAddress))
            {
                await DisplayAlert("Ошибка", "Введите оба адреса", "OK");
                return;
            }

            // Проверка корректности адресов
            if (!IsValidAddress(startAddress) || !IsValidAddress(endAddress))
            {
                await DisplayAlert("Ошибка", "Один или оба адреса некорректны", "OK");
                return;
            }

            // Имитируем заказ такси (реально будет запрос к серверу для поиска ближайшего такси)
            bool isTaxiAvailable = await RequestTaxi(startAddress, endAddress);

            if (isTaxiAvailable)
            {
                await DisplayAlert("Такси вызвано", $"Такси от {startAddress} до {endAddress} успешно вызвано", "OK");
            }
            else
            {
                await DisplayAlert("Ошибка", "Не удалось вызвать такси, попробуйте позже", "OK");
            }
        }

        // Метод для проверки корректности адреса (имитация)
        private bool IsValidAddress(string address)
        {
            // Здесь будет логика для проверки правильности введенного адреса
            // Например, через API геокодирования (Google Geocoding API)
            return !string.IsNullOrEmpty(address);
        }

        // Метод для имитации вызова такси (заглушка)
        private async Task<bool> RequestTaxi(string startAddress, string endAddress)
        {
            // Имитируем задержку и успешный заказ такси
            await Task.Delay(1000);
            return true;  // Предположим, что такси всегда доступно для упрощения
        }
    }
}


<--TaxiApp-->


<--TaxiApp-desktop-->

form1

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TaxiAppDesktop
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void AutorizationButton_Click(object sender, EventArgs e)
        {
            string phoneNumber = PhoneTextBox.Text;
            string password = PasswordTextBox.Text;

            if (string.IsNullOrWhiteSpace(phoneNumber) || string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("Пожалуйста, заполните все поля.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            bool isAuthorized = AuthenticateUser(phoneNumber, password);

            if (isAuthorized)
            {
                MessageBox.Show("Авторизация успешна!", "Успех", MessageBoxButtons.OK, MessageBoxIcon.Information);

                Form2 form2 = new Form2();
                form2.Show();
                this.Hide();
            }
            else
            {

                MessageBox.Show("Неверный номер телефона или пароль.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        private bool AuthenticateUser(string phoneNumber, string password)
        {

            string validPhoneNumber = "+79969409869";
            string validPassword = "password";

            return phoneNumber == validPhoneNumber && password == validPassword;
        }
    }
}



form2 
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TaxiAppDesktop
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {

            string startAddress = StartAddressTextBox.Text;
            string endAddress = EndAddressTextBox.Text;


            if (string.IsNullOrWhiteSpace(startAddress) || string.IsNullOrWhiteSpace(endAddress))
            {
                MessageBox.Show("Пожалуйста, заполните оба адреса.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }


            MessageBox.Show($"Такси вызвано!\n\nНачальный адрес: {startAddress}\nКонечный адрес: {endAddress}", "Успех", MessageBoxButtons.OK, MessageBoxIcon.Information);


            StartAddressTextBox.Clear();
            EndAddressTextBox.Clear();
        }
    }
}


<--TaxiApp-desktop-->

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
