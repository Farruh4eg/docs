export const load = async() => {
  let data = `\n
  MAUI CODE
  ==========================================================


  <?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="TrafficLight.MainPage">

    <VerticalStackLayout Padding="20" Spacing="20" VerticalOptions="Center" BackgroundColor="White">

        <Grid x:Name="TrafficLightContainer" RowSpacing="1" Padding="10" WidthRequest="150" HeightRequest="300">
            <Grid.RowDefinitions>
                <RowDefinition Height="100"/>
                <RowDefinition Height="100"/>
                <RowDefinition Height="100"/>
            </Grid.RowDefinitions>
                <BoxView x:Name="RedLight" Color="Gray" CornerRadius="50" HeightRequest="100" WidthRequest="100" Grid.Row="0" />
                <BoxView x:Name="YellowLight" Color="Gray" CornerRadius="50" HeightRequest="100" WidthRequest="100" Grid.Row="1" />
                <BoxView x:Name="GreenLight" Color="Gray" CornerRadius="50" HeightRequest="100" WidthRequest="100" Grid.Row="2" />
        </Grid>

        <Button x:Name="ChangeColorButton" Text="Change Color" Clicked="OnChangeColorClicked" />

        <VerticalStackLayout>
            <Entry x:Name="TimerEntry" Placeholder="Enter timer in seconds" Keyboard="Numeric" />
            <Button x:Name="StartAutoChangeButton" Text="Start Auto Change" Clicked="OnStartAutoChangeClicked" />
        </VerticalStackLayout>

        <Button x:Name="StopAutoChangeButton" Text="Stop Auto Change" IsVisible="False" Clicked="OnStopAutoChangeClicked" />

    </VerticalStackLayout>

</ContentPage>




CSHARP
===========================================================================
  using System;
using System.Drawing;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        private int currentLightIndex = 0; 
        private Timer autoChangeTimer; 

        public Form1()
        {
            InitializeComponent();            
            UpdateLights();         
        }       

        private void OnChangeColorClicked(object sender, EventArgs e)
        {
            StopAutoChange();  
            MoveToNextLight();
        }

        private void OnStartAutoChangeClicked(object sender, EventArgs e)
        {
            
            if (int.TryParse(timerEntry.Text, out int intervalSeconds) && intervalSeconds > 0)
            {
                autoChangeTimer = new Timer { Interval = intervalSeconds * 1000 }; 
                autoChangeTimer.Tick += (s, args) => MoveToNextLight(); 
                autoChangeTimer.Start();

                startAutoChangeButton.Visible = false; 
                stopAutoChangeButton.Visible = true;  
            }
            else
            {
                MessageBox.Show("Введите значение в поле.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void OnStopAutoChangeClicked(object sender, EventArgs e)
        {
            StopAutoChange();  
        }

        private void StopAutoChange()
        {
            if (autoChangeTimer != null)  
            {
                autoChangeTimer.Stop();  
                autoChangeTimer.Dispose();  
                autoChangeTimer = null;  
            }

            startAutoChangeButton.Visible = true;  
            stopAutoChangeButton.Visible = false;  
        }

        private void MoveToNextLight()
        {
            currentLightIndex = (currentLightIndex + 1) % 3; 
            UpdateLights();  
        }

        private void UpdateLights()
        {            
            redLight.BackColor = Color.Gray;
            yellowLight.BackColor = Color.Gray;
            greenLight.BackColor = Color.Gray;
        
            switch (currentLightIndex)
            {
                case 0:
                    redLight.BackColor = Color.Red;
                    break;
                case 1:
                    yellowLight.BackColor = Color.Yellow;
                    break;
                case 2:
                    greenLight.BackColor = Color.Green;
                    break;
            }
        }      
        public static void Form()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }          
        private void timerEntry_TextChanged(object sender, EventArgs e)
        {
            timerEntry.GotFocus += (s, e1) =>  
            {
                if (timerEntry.Text == "Interval (s)")
                {
                    timerEntry.Text = "";
                    timerEntry.ForeColor = Color.Black;
                }
            };
            timerEntry.LostFocus += (s, e2) =>  
            {
                if (string.IsNullOrWhiteSpace(timerEntry.Text))
                {
                    timerEntry.Text = "Interval (s)";
                    timerEntry.ForeColor = Color.Gray;
                }
            };
        }
                
        private void changeColorButton_Click(object sender, EventArgs e)
        {
            currentLightIndex = (currentLightIndex + 1) % 3;  
            UpdateLights();  
        }
                
        private void startAutoChangeButton_Click(object sender, EventArgs e)
        {
            OnStartAutoChangeClicked(sender, e);
        }

        private void stopAutoChangeButton_Click(object sender, EventArgs e)
        {
            OnStopAutoChangeClicked(sender, e);
        }
    }
}
\n\n\n\n\n\n\n\n\n`
return {data};
}