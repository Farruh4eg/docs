export const load = async () => {
	let data = `\n\n\nMAINPAGE.XAML
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="mobile.MainPage">

    <ScrollView>
        <VerticalStackLayout
            Padding="30,0"
            Spacing="25">

            <Grid
                Padding="-30,0"
                ColumnDefinitions="55, *, 55">

                <Image
                    Source="logo.png"
                    HeightRequest="300"
                    Grid.Column="1"
                    HorizontalOptions="Center"
                />

                <Button
                    x:Name="exitButton"
                    HorizontalOptions="End"
                    VerticalOptions="Start"
                    Grid.Column="2"
                    BackgroundColor="Transparent"
                    ImageSource="exit.svg"
                    WidthRequest="55"
                    HeightRequest="55"
                    Clicked="exitButton_Click"
                />
            </Grid>

            <VerticalStackLayout
                Spacing="10">

                <Label
                    FontSize="18"
                    FontFamily="Times New Roman"
                    Text="{Binding Source={x:Reference passwordLengthSlider}, Path=Value, StringFormat='Длина пароля: {0:N0}'}"
                    HorizontalOptions="Center"
                />

                <Slider
                    x:Name="passwordLengthSlider"
                    Minimum="8"
                    Maximum="20"
                    Value="8"
                    HorizontalOptions="Fill"
                />
            </VerticalStackLayout>

            <Grid
                ColumnDefinitions="Auto, *"
                RowDefinitions="Auto, Auto, Auto, Auto">

                <Label
                    FontSize="18"
                    FontFamily="Times New Roman"
                    Text="Строчные буквы"
                    VerticalOptions="Center"
                    HorizontalOptions="Start"
                    Grid.Row="0"
                    Grid.Column="0"
                />

                <Label
                    FontSize="18"
                    FontFamily="Times New Roman"
                    Text="Заглавные буквы"
                    VerticalOptions="Center"
                    HorizontalOptions="Start"
                    Grid.Row="1"
                    Grid.Column="0"
                />

                <Label
                    FontSize="18"
                    FontFamily="Times New Roman"
                    Text="Цифры"
                    VerticalOptions="Center"
                    HorizontalOptions="Start"
                    Grid.Row="2"
                    Grid.Column="0"
                />

                <Label
                    FontSize="18"
                    FontFamily="Times New Roman"
                    Text="Специальные символы !@#$%^&amp;*()"
                    VerticalOptions="Center"
                    HorizontalOptions="Start"
                    Grid.Row="3"
                    Grid.Column="0"
                />

                <CheckBox
                    x:Name="includeLowerCaseCheckBox"
                    IsChecked="False"
                    VerticalOptions="Center"
                    HorizontalOptions="End"
                    Grid.Row="0"
                    Grid.Column="1"
                />

                <CheckBox
                    x:Name="includeUpperCaseCheckBox"
                    IsChecked="False"
                    VerticalOptions="Center"
                    HorizontalOptions="End"
                    Grid.Row="1"
                    Grid.Column="1"
                />

                <CheckBox
                    x:Name="includeNumbersCheckBox"
                    IsChecked="False"
                    VerticalOptions="Center"
                    HorizontalOptions="End"
                    Grid.Row="2"
                    Grid.Column="1"
                />

                <CheckBox
                    x:Name="includeSpecialCharactersCheckBox"
                    IsChecked="False"
                    VerticalOptions="Center"
                    HorizontalOptions="End"
                    Grid.Row="3"
                    Grid.Column="1"
                />

            </Grid>

            <Button
                x:Name="generatePasswordButton"
                Text="Сгенерировать"
                FontSize="18"
                FontFamily="Times New Roman"
                TextColor="White"
                BackgroundColor="MediumSlateBlue"
                VerticalOptions="Center"
                HorizontalOptions="FillAndExpand"
                Clicked="generatePasswordButton_Click"
            />

            <Grid
                ColumnDefinitions="*, Auto">

                <Border
                    Stroke="MediumSlateBlue"
                    StrokeThickness="2"
                    StrokeShape="RoundRectangle 15, 15, 15, 15"
                    Padding="7"
                    VerticalOptions="Center"
                    HorizontalOptions="Fill">

                    <Label
                        x:Name="generatedPasswordLabel"
                        FontSize="18"
                        FontFamily="Times New Roman"
                        HorizontalOptions="Center"
                        VerticalOptions="Center"
                    />

                </Border>

                <Button
                    x:Name="copyPasswordButton"
                    HorizontalOptions="End"
                    VerticalOptions="Center"
                    Grid.Column="1"
                    BackgroundColor="Transparent"
                    ImageSource="copy.svg"
                    WidthRequest="55"
                    HeightRequest="55"
                    Clicked="copyPasswordButton_Click"
                />
            </Grid>

        </VerticalStackLayout>
    </ScrollView>

</ContentPage>

MAINPAGE.XAML.CS


namespace mobile
{
    public partial class MainPage : ContentPage
    {
        private string lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        private string upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private string numbers = "0123456789";
        private string specialCharacters = "!@#$%^&*()";
        private string password;

        public MainPage()
        {
            InitializeComponent();
        }

        private void generatePasswordButton_Click(object sender, EventArgs e)
        {
            int passwordLength = (int)passwordLengthSlider.Value;

            string availableCharacters = getAvailableCharacters();

            if (string.IsNullOrEmpty(availableCharacters))
            {
                generatedPasswordLabel.Text = "Нужно что-то выбрать!";

                return;
            }

            do
            {
                password = generatePassword(passwordLength, availableCharacters);
            } while (!isPasswordValid(password.ToCharArray()));

            generatedPasswordLabel.Text = password;
        }

        private void copyPasswordButton_Click(object sender, EventArgs e)
        {
            string generatedPassword = generatedPasswordLabel.Text;

            if (!string.IsNullOrEmpty(generatedPassword) && generatedPassword != "Нужно что-то выбрать!")
            {
                Clipboard.SetTextAsync(generatedPassword);

                DisplayAlert("Копирование", "Пароль скопирован в буфер обмена!", "ОК");
            }
            else
            {
                DisplayAlert("Ошибка", "Сначала сгенерируйте пароль!", "ОК");
            }
        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private string getAvailableCharacters()
        {
            string availableCharacters = "";

            if (includeLowerCaseCheckBox.IsChecked) availableCharacters += lowerCaseLetters;
            if (includeUpperCaseCheckBox.IsChecked) availableCharacters += upperCaseLetters;
            if (includeNumbersCheckBox.IsChecked) availableCharacters += numbers;
            if (includeSpecialCharactersCheckBox.IsChecked) availableCharacters += specialCharacters;

            return availableCharacters;
        }

        private string generatePassword(int passwordLength, string availableCharacters)
        {
            Random random = new Random();
            char[] password = new char[passwordLength];

            for (int i = 0; i < passwordLength; i++)
            {
                password[i] = availableCharacters[random.Next(availableCharacters.Length)];
            }

            return new string(password);
        }

        private bool isPasswordValid(char[] password)
        {
            if (includeLowerCaseCheckBox.IsChecked && !password.Any(c => lowerCaseLetters.Contains(c))) return false;
            if (includeUpperCaseCheckBox.IsChecked && !password.Any(c => upperCaseLetters.Contains(c))) return false;
            if (includeNumbersCheckBox.IsChecked && !password.Any(c => numbers.Contains(c))) return false;
            if (includeSpecialCharactersCheckBox.IsChecked && !password.Any(c => specialCharacters.Contains(c))) return false;

            return true;
        }
    }
}

DEKSTOP

MainForm

using System.Linq;
using System;
using System.Windows.Forms;

namespace PC
{
    public partial class mainForm : Form
    {
        private string lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        private string upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private string numbers = "0123456789";
        private string specialCharacters = "!@#$%^&*()";
        private string password;

        public mainForm()
        {
            InitializeComponent();
        }

        private void generatePasswordButton_Click(object sender, EventArgs e)
        {
            int passwordLength = (int)passwordLengthTrackBar.Value;

            string availableCharacters = getAvailableCharacters();

            if (string.IsNullOrEmpty(availableCharacters))
            {
                generatedPasswordLabel.Text = "Нужно что-то выбрать!";
                generatedPasswordLabel.Left = 207 - (generatedPasswordLabel.Width / 2);

                return;
            }

            do
            {
                password = generatePassword(passwordLength, availableCharacters);
            } while (!isPasswordValid(password.ToCharArray()));

            generatedPasswordLabel.Text = password;
            generatedPasswordLabel.Left = 207 - (generatedPasswordLabel.Width / 2);
        }

        private void copyPasswordButton_Click(object sender, EventArgs e)
        {
            string generatedPassword = generatedPasswordLabel.Text;

            if (!string.IsNullOrEmpty(generatedPassword) && generatedPassword != "Нужно что-то выбрать!")
            {
                Clipboard.SetText(generatedPassword);

                MessageBox.Show("Пароль скопирован в буфер обмена!", "Копирование");
            }
            else
            {
                MessageBox.Show("Сначала сгенерируйте пароль!", "Ошибка");
            }
        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void passwordLengthTrackBar_Scroll(object sender, EventArgs e)
        {
            passwordLengthLabel.Text = "Длина пароля: " + passwordLengthTrackBar.Value.ToString();

            passwordLengthLabel.Left = (this.ClientSize.Width - passwordLengthLabel.Width) / 2;
        }

        private string getAvailableCharacters()
        {
            string availableCharacters = "";

            if (includeLowerCaseCheckBox.Checked) availableCharacters += lowerCaseLetters;
            if (includeUpperCaseCheckBox.Checked) availableCharacters += upperCaseLetters;
            if (includeNumbersCheckBox.Checked) availableCharacters += numbers;
            if (includeSpecialCharactersCheckBox.Checked) availableCharacters += specialCharacters;

            return availableCharacters;
        }

        private string generatePassword(int passwordLength, string availableCharacters)
        {
            Random random = new Random();
            char[] password = new char[passwordLength];

            for (int i = 0; i < passwordLength; i++)
            {
                password[i] = availableCharacters[random.Next(availableCharacters.Length)];
            }

            return new string(password);
        }

        private bool isPasswordValid(char[] password)
        {
            if (includeLowerCaseCheckBox.Checked && !password.Any(c => lowerCaseLetters.Contains(c))) return false;
            if (includeUpperCaseCheckBox.Checked && !password.Any(c => upperCaseLetters.Contains(c))) return false;
            if (includeNumbersCheckBox.Checked && !password.Any(c => numbers.Contains(c))) return false;
            if (includeSpecialCharactersCheckBox.Checked && !password.Any(c => specialCharacters.Contains(c))) return false;

            return true;
        }
    }
}


\n\n\n\n\n\n\n\n\n`;

	return { data };
};
