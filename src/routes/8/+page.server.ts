export const load = async () => {
	let data = `\n\n\nMAINPAGE.XAML
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="Modular2024.MainPage">

    <ScrollView>
        <VerticalStackLayout
            Padding="30,0"
            Spacing="25">
            <Entry x:Name="userInput" Keyboard="Numeric" Placeholder="Введите 6-значное число" Text=""/>
            <Button
                x:Name="check"
                Text="Проверить" 
                Clicked="CheckGuess"
                HorizontalOptions="Fill" />
            <Button
                x:Name="newGame"
                Text="Новая игра"
                Clicked="NewGame"
                HorizontalOptions="Fill" />
            <VerticalStackLayout>
                <Label x:Name="bullsText"/>
                <Label x:Name="cowsText"/>
            </VerticalStackLayout>
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>


MAIN.PAGE.XAML.CS

namespace Modular2024
{
    public partial class MainPage : ContentPage
    {
        int bulls = 0;
        int cows = 0;
        string number = "";

        public MainPage()
        {
            InitializeComponent();
            NewGame(null, null);
        }

        void NewGame(object sender, EventArgs e)
        {
            bulls = 0;
            cows = 0;
            number = "";
            userInput.Text = "";
            UpdateCounters();
            GenerateNumber();
        }

        void UpdateCounters()
        {
            bullsText.Text = $"Быки: {bulls}";
            cowsText.Text = $"Коровы: {cows}";
            bulls = 0;
            cows = 0;
        }

        void GenerateNumber()
        {
            while (number.Length != 6)
            {
                int digit = new Random().Next(10);
                if (!number.Contains(digit.ToString()))
                {
                    number += digit.ToString();
                }
            }
        }

        void CheckGuess(object sender, EventArgs e)
        {
            if (userInput.Text.Length != 6)
            {
                DisplayAlert("Ошибка", "Пожалуйста, введите 6-значное число.", "OK");
                return;
            }
            for (int i = 0; i < 6; i++)
            {
                if (number[i] == userInput.Text[i])
                {
                    ++bulls;
                }
                else if (userInput.Text.Contains(number[i]))
                {
                    ++cows;
                }
            }

            if (bulls == 6)
            {
                DisplayAlert("Победа!", "Поздравляем. Вы отгадали загаданное число.", "OK");
                NewGame(null, null);
            }

            UpdateCounters();
        }
    }

}




ДЕКСТОП ПРИЛОЖЕНИЕ

1.Генерация секретного числа:
oСекретное число состоит из 4 уникальных цифр.
2.Ввод попытки игрока:
oПоле для ввода числа.
oКнопка для проверки попытки.
3.Подсчет быков и коров:
oПосле каждой попытки программа вычисляет количество быков и коров.
4.Окончание игры:
oИгра завершается, когда игрок угадывает секретное число.
5.Новая игра:
oКнопка для начала новой игры.


using System;
using System.Linq;
using System.Windows.Forms;

namespace BullsAndCowsAppWinForms
{
    public partial class MainForm : Form
    {
        private string secretNumber;

        public MainForm()
        {
            InitializeComponent();
            StartNewGame();
        }

        // Начало новой игры
        private void StartNewGame()
        {
            var random = new Random();
            secretNumber = new string(Enumerable.Range(0, 10).OrderBy(x => random.Next()).Take(4).Select(x => x.ToString()[0]).ToArray());
            resultLabel.Text = "";
            guessTextBox.Text = "";
        }

        // Обработчик нажатия кнопки "Проверить"
        private void checkButton_Click(object sender, EventArgs e)
        {
            string guess = guessTextBox.Text;

            if (guess.Length != 4 || !guess.All(char.IsDigit) || guess.Distinct().Count() != 4)
            {
                MessageBox.Show("Введите 4 уникальные цифры.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var result = CalculateBullsAndCows(guess);
            resultLabel.Text = $"Быки: {result.Bulls}, Коровы: {result.Cows}";

            if (result.Bulls == 4)
            {
                MessageBox.Show("Вы угадали число!", "Победа", MessageBoxButtons.OK, MessageBoxIcon.Information);
                StartNewGame();
            }
        }

        // Подсчет быков и коров
        private (int Bulls, int Cows) CalculateBullsAndCows(string guess)
        {
            int bulls = 0, cows = 0;

            for (int i = 0; i < 4; i++)
            {
                if (guess[i] == secretNumber[i])
                {
                    bulls++;
                }
                else if (secretNumber.Contains(guess[i]))
                {
                    cows++;
                }
            }

            return (bulls, cows);
        }

        // Обработчик нажатия кнопки "Новая игра"
        private void newGameButton_Click(object sender, EventArgs e)
        {
            StartNewGame();
        }
    }
}



\n\n\n\n\n\n\n\n\n`;

	return { data };
};
